/**
 * Zentralisierte Konfiguration.
 * Alle Environment-Variablen und Konstanten an einem Ort.
 */

export const config = {
  server: {
    port: Number(process.env.PORT) || 3001,
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_list',
  },
  validation: {
    item: {
      nameMinLength: 1,
      nameMaxLength: 100,
      quantityMin: 1,
      quantityMax: 999,
    },
  },
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY ?? '',
    apiSecret: process.env.SHOPIFY_API_SECRET ?? '',
    scopes: process.env.SHOPIFY_SCOPES ?? 'read_products,read_orders',
    callbackPath: '/shopify/callback',
    callbackUrl: process.env.SHOPIFY_CALLBACK_URL ?? 'http://localhost:3001/shopify/callback',
    /** Nach Installation hierhin umleiten (z.B. http://localhost:5173 für Frontend). Leer = Redirect auf Backend /. */
    frontendUrl: process.env.FRONTEND_URL ?? '',
  },
} as const;

export type Config = typeof config;
