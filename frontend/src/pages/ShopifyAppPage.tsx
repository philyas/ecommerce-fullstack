import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  status: string;
  variants: Array<{ id: number; title: string; price: string }>;
  image?: { src: string; alt: string | null };
}

export function ShopifyAppPage() {
  const [searchParams] = useSearchParams();
  const shop = searchParams.get('shop') ?? '';
  const installed = searchParams.get('installed') === '1';

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    if (!shop.trim()) {
      setError('Shop fehlt. URL mit ?shop=DEIN-SHOP.myshopify.com öffnen.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/shopify/products?shop=${encodeURIComponent(shop)}`
      );
      const data = (await res.json()) as { products?: ShopifyProduct[] };
      if (!res.ok) {
        setError((data as { error?: string }).error ?? 'Fehler beim Laden');
        setProducts([]);
        return;
      }
      setProducts(data.products ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Netzwerkfehler');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            testshop24
          </h1>
          <p className="mt-1 text-slate-500">Shopify App</p>
        </header>

        <section className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm p-6 mb-8">
          {installed && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2 text-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              App wurde erfolgreich installiert.
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Shop
              </span>
              <p className="mt-0.5 truncate font-mono text-sm text-slate-700">
                {shop || '—'}
              </p>
            </div>
            <button
              type="button"
              onClick={loadProducts}
              disabled={loading || !shop.trim()}
              className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Lade…
                </span>
              ) : (
                'Produkte laden'
              )}
            </button>
          </div>
          {!shop && (
            <p className="mt-4 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
              App mit <code className="font-mono text-amber-800">?shop=DEIN-SHOP.myshopify.com</code> öffnen.
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </section>

        {products.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Produkte ({products.length})
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="group rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden transition hover:shadow-md hover:border-slate-300/60"
                >
                  <div className="flex gap-4 p-4">
                    {p.image?.src ? (
                      <img
                        src={p.image.src}
                        alt={p.image.alt ?? p.title}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg flex-shrink-0 bg-slate-100"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 text-xs">
                        Kein Bild
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 truncate group-hover:text-slate-700">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {p.vendor} · {p.product_type}
                      </p>
                      <span
                        className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                          p.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : p.status === 'draft'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {p.status}
                      </span>
                      {p.variants?.[0] && (
                        <p className="text-sm font-medium text-slate-700 mt-2">
                          {p.variants[0].price} €
                          {p.variants[0].title !== 'Default Title' && (
                            <span className="font-normal text-slate-500"> · {p.variants[0].title}</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
