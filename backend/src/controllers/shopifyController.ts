/**
 * Shopify OAuth: Installations-URL ausliefern und Callback (Token tauschen + speichern).
 */
import { Request, Response } from 'express';
import crypto from 'crypto';
import { config } from '../config/index.js';
import { ShopSession } from '../models/ShopSession.js';

function buildShopDomain(shop: string): string {
  const s = shop.trim().toLowerCase();
  if (s.endsWith('.myshopify.com')) return s;
  return `${s}.myshopify.com`;
}

function verifyHmac(query: Record<string, string>, secret: string): boolean {
  const hmac = query.hmac;
  if (!hmac) return false;
  const sorted = Object.keys(query)
    .filter((k) => k !== 'hmac' && k !== 'signature')
    .sort()
    .map((k) => `${k}=${query[k]}`)
    .join('&');
  const hash = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(hash, 'hex'));
}

/**
 * GET /shopify/auth?shop=DEIN-DEV-SHOP
 * Leitet zur Shopify-Installationsseite weiter.
 */
export async function auth(req: Request, res: Response): Promise<void> {
  const shop = req.query.shop as string | undefined;
  if (!shop) {
    res.status(400).json({ error: 'Query parameter "shop" is required (e.g. dein-shop.myshopify.com)' });
    return;
  }

  const shopDomain = buildShopDomain(shop);
  const redirectUri = config.shopify.callbackUrl;
  const state = crypto.randomBytes(16).toString('hex');

  const installUrl =
    `https://${shopDomain}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(config.shopify.apiKey)}` +
    `&scope=${encodeURIComponent(config.shopify.scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${state}`;

  res.redirect(installUrl);
}

/**
 * GET /shopify/callback?code=...&hmac=...&shop=...&state=...
 * Tauscht code gegen Access Token und speichert die Session.
 */
export async function callback(req: Request, res: Response): Promise<void> {
  const query = req.query as Record<string, string>;
  if (!verifyHmac(query, config.shopify.apiSecret)) {
    res.status(400).json({ error: 'Invalid HMAC' });
    return;
  }

  const { code, shop } = query;
  if (!code || !shop) {
    res.status(400).json({ error: 'Missing code or shop' });
    return;
  }

  const shopDomain = buildShopDomain(shop);
  const body = {
    client_id: config.shopify.apiKey,
    client_secret: config.shopify.apiSecret,
    code,
  };

  const tokenRes = await fetch(`https://${shopDomain}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    console.error('Shopify token exchange failed:', tokenRes.status, errText);
    res.status(502).json({ error: 'Token exchange failed' });
    return;
  }

  const data = (await tokenRes.json()) as { access_token: string };
  const accessToken = data.access_token;

  await ShopSession.findOneAndUpdate(
    { shop: shopDomain },
    { shop: shopDomain, accessToken },
    { upsert: true, new: true }
  );

  const frontendUrl = config.shopify.frontendUrl?.trim();
  const redirectTo = frontendUrl
    ? `${frontendUrl.replace(/\/$/, '')}/app?shop=${encodeURIComponent(shopDomain)}&installed=1`
    : `/?shop=${encodeURIComponent(shopDomain)}&installed=1`;
  res.redirect(redirectTo);
}

/**
 * GET /shopify/products?shop=DEIN-SHOP
 * Liefert Produkte aus Shopify (zum Testen der Anbindung).
 */
export async function products(req: Request, res: Response): Promise<void> {
  const shop = req.query.shop as string | undefined;
  if (!shop) {
    res.status(400).json({ error: 'Query parameter "shop" is required' });
    return;
  }

  const shopDomain = buildShopDomain(shop);
  const session = await ShopSession.findOne({ shop: shopDomain });
  if (!session) {
    res.status(404).json({ error: 'Shop not installed. Call /shopify/auth?shop=' + shopDomain + ' first.' });
    return;
  }

  const apiVersion = '2025-01';
  const apiRes = await fetch(
    `https://${shopDomain}/admin/api/${apiVersion}/products.json?limit=10`,
    {
      headers: {
        'X-Shopify-Access-Token': session.accessToken,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!apiRes.ok) {
    const errText = await apiRes.text();
    console.error('Shopify API error:', apiRes.status, errText);
    res.status(502).json({
      error: 'Shopify API request failed',
      shopifyStatus: apiRes.status,
      shopifyBody: errText.slice(0, 500),
    });
    return;
  }

  const data = (await apiRes.json()) as { products: unknown[] };
  res.json({ products: data.products });
}
