# Anleitung: Theme App Extension (App Block)

Damit **Kunden** deine App im Shop sehen, baust du eine **Theme App Extension**. Der Händler kann dann im Theme-Editor einen Block einfügen – z.B. „Empfohlene Produkte“ oder ein eigenes Widget.

---

## Voraussetzungen

- Shopify CLI installiert (Node.js 18+)
- Deine App bereits im Dev Dashboard (testshop24) mit OAuth
- Dev-Shop: z.B. `testshop24-9268.myshopify.com`

---

## 1. Shopify CLI installieren

```bash
npm install -g @shopify/cli @shopify/theme
```

Oder mit Homebrew (macOS):

```bash
brew tap shopify/shopify
brew install shopify-cli
```

---

## 2. Neues App-Projekt mit Theme Extension (falls noch keins)

Wenn du die Extension **in einem eigenen Shopify-App-Projekt** haben willst (empfohlen für Theme UI):

```bash
# In einem neuen Ordner (z.B. shopify-app)
npm init -y
npx shopify app init
```

- Wähle **Theme app extension** (oder **Create new extension** → Theme).
- Verknüpfe mit deiner bestehenden App: `shopify app config link` (Client-ID von testshop24).

Wenn du **nur die Extension** zu deiner bestehenden App hinzufügen willst und die App schon im **Dev Dashboard** existiert:

- Im Dev Dashboard: **Versionen** → **Version erstellen** (oder bestehende Version bearbeiten).
- Dort gibt es den Bereich **Erweiterungen** / **Extensions**. Theme Extensions legst du oft über die CLI an und pushest sie in diese Version.

---

## 3. Theme Extension anlegen (CLI)

Im Ordner, in dem deine Shopify-App lebt (oder wo du `shopify app init` ausgeführt hast):

```bash
shopify app generate extension
```

- Typ: **Theme app extension** wählen.
- Namen vergeben (z.B. `storefront-block`).

Es entsteht ein Unterordner (z.B. `extensions/storefront-block/`) mit:

- `blocks/*.liquid` – UI des Blocks (Liquid + optional CSS/JS)
- `shopify.extension.toml` – Konfiguration der Extension

---

## 4. App Block (Liquid) bauen

Beispiel: Ein Block, der den Shop-Namen und einen Link anzeigt (Daten später von deinem Backend oder Metafields).

**Datei:** `extensions/storefront-block/blocks/example.liquid`

```liquid
{% comment %}
  App Block: Wird im Theme-Editor unter "Apps" eingefügt.
  Schema definiert die Einstellungen, die der Händler im Editor sieht.
{% endcomment %}

<div class="my-app-block" style="padding: 1rem; border: 1px solid #ddd;">
  <h3>{{ block.settings.heading | default: 'Von unserer App' }}</h3>
  <p>{{ block.settings.text }}</p>
</div>

{% schema %}
{
  "name": "Mein App Block",
  "target": "section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Überschrift",
      "default": "Von unserer App"
    },
    {
      "type": "textarea",
      "id": "text",
      "label": "Text"
    }
  ]
}
{% endschema %}
```

- **target**: `"section"` = Block kann in Sections eingefügt werden (typisch für Homepage, Seiten).
- Weitere Targets: [Shopify Docs – Theme App Extension targets](https://shopify.dev/docs/apps/online-store/theme-app-extensions/extension-configuration#target).

---

## 5. Daten von deinem Backend laden (optional)

Wenn der Block Daten von deinem Backend (localhost:3001) braucht:

- Im Theme kannst du **keinen** direkten Request von der Storefront zu `localhost` machen (CORS, andere Domain).
- **Option A:** **App Proxy** einrichten: Shopify leitet z.B. `https://testshop24-9268.myshopify.com/apps/meine-app/api` an dein Backend weiter. Du konfigurierst das im Partner Dashboard (App-URLs / App Proxy). Dann ruft der Block diese URL auf (gleiche Domain = kein CORS).
- **Option B:** Daten als **Metafields** vom Backend in den Shop schreiben (Admin API), Block liest Metafields nur (kein Proxy nötig).

**App Proxy (Kurzaufbau):**

- Dev Dashboard → deine App → Version → **App-Proxy** (oder URLs/Konfiguration).
- Subpath: z.B. `apps/meine-app`
- Ziel-URL: z.B. `https://deine-backend-url.com/shopify/proxy` (Production). Lokal: ngrok-URL.
- Im Block: `fetch('/apps/meine-app/api/products')` – Shopify leitet an dein Backend weiter; du lieferst JSON zurück.

---

## 6. Extension deployen / testen

```bash
# Aus dem App-Root (wo shopify.app.toml liegt)
shopify app deploy
```

Oder nur die Extension:

```bash
shopify app deploy --only-extensions
```

Danach erscheint die Extension in der **aktuellen App-Version** im Dev Dashboard.

---

## 7. Im Theme einbauen (Händler / du)

1. Im Shopify Admin: **Online Store** → **Themes** → **Customize** (Theme-Editor).
2. Eine Seite öffnen (z.B. Homepage).
3. **Add block** / **Block hinzufügen** → unter **Apps** deine App (testshop24) und den Block (z.B. „Mein App Block“) wählen.
4. Block platzieren, Einstellungen (Überschrift, Text) ausfüllen → **Save**.

Der **Kunde** sieht den Block beim Besuch der Shop-Seite.

---

## 8. Übersicht der Schritte

| Schritt | Was |
|--------|-----|
| 1 | Shopify CLI installieren |
| 2 | App-Projekt mit Theme Extension anlegen oder bestehende App verknüpfen |
| 3 | `shopify app generate extension` → Theme app extension |
| 4 | Liquid-Block in `extensions/.../blocks/*.liquid` bauen + Schema |
| 5 | (Optional) App Proxy für Backend-Daten |
| 6 | `shopify app deploy` |
| 7 | Im Theme-Editor Block unter „Apps“ einfügen |

---

## Hilfreiche Links

- [Theme app extensions (Shopify Dev)](https://shopify.dev/docs/apps/online-store/theme-app-extensions)
- [App Block – Schema & targets](https://shopify.dev/docs/apps/online-store/theme-app-extensions/extensions-framework#block)
- [App Proxy](https://shopify.dev/docs/apps/online-store/app-proxy)

Wenn du willst, können wir als Nächstes einen konkreten Block (z.B. „Letzte 5 Produkte aus dem Backend“) Schritt für Schritt durchgehen.
