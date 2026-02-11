# Shopify-Anbindung

## Was du jetzt machen musst

### 1. Zugangsdaten aus dem Partner-Dashboard

- Gehe zu [Partners](https://partners.shopify.com) → deine App → **App setup** / **Client credentials**.
- Kopiere **Client ID** und **Client secret**.

### 2. App-URLs in Shopify eintragen

In der App unter **URLs** (Configuration / App setup) eintragen:

- **Allowed redirection URL(s):**  
  `http://localhost:3001/shopify/callback`  
  (Später für Production: z. B. `https://deine-domain.de/shopify/callback`.)

Ohne exakte Übereinstimmung funktioniert der OAuth-Callback nicht.

### 3. `.env` anlegen

Im Backend-Ordner:

```bash
cp .env.example .env
```

In `.env` eintragen:

- `SHOPIFY_API_KEY` = Client ID  
- `SHOPIFY_API_SECRET` = Client secret  
- `SHOPIFY_SCOPES` = z. B. `read_products,read_orders`  
- `SHOPIFY_CALLBACK_URL` = `http://localhost:3001/shopify/callback`

### 4. Backend starten

```bash
npm run dev
```

### 5. App installieren (OAuth durchspielen)

Im Browser aufrufen (ersetze `DEIN-DEV-SHOP` durch deinen Dev-Shop-Namen):

```
http://localhost:3001/shopify/auth?shop=DEIN-DEV-SHOP.myshopify.com
```

Du wirst zu Shopify weitergeleitet, bestätigst die Berechtigungen, danach leitet Shopify auf deine Callback-URL um. Der Access Token wird in MongoDB gespeichert.

### 6. Test: Produkte abrufen

```
GET http://localhost:3001/shopify/products?shop=DEIN-DEV-SHOP.myshopify.com
```

Wenn die App installiert ist, siehst du die ersten 10 Produkte aus dem Shop.

---

## Routen

| Route | Beschreibung |
|-------|--------------|
| `GET /shopify/auth?shop=...` | Startet die Installation (Redirect zu Shopify). |
| `GET /shopify/callback` | Wird von Shopify aufgerufen; tauscht Code gegen Token und speichert die Session. |
| `GET /shopify/products?shop=...` | Liefert Produkte aus Shopify (zum Testen). |

## Später: Custom vs. Public App

- **Custom App:** Ein Shop, Token ist bereits gespeichert; du kannst weitere Admin-API-Endpunkte anbinden.
- **Public App:** Mehrere Shops installieren über denselben OAuth-Flow. Zusätzlich: Billing API, Webhooks, App-Store-Listing.
