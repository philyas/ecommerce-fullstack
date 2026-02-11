# Theme App Extension (testshop24)

Dieser Ordner enthält die **Theme App Extension** für deine Shopify-App. Der Block erscheint im Theme-Editor unter **Apps** und kann auf der Storefront eingebaut werden.

## Voraussetzungen

- **Shopify CLI** (Node.js 18+)
- App **testshop24** im Dev Dashboard bereits angelegt
- Backend (OAuth etc.) läuft weiter im Ordner `../backend`

## 1. Shopify CLI installieren

```bash
npm install -g @shopify/cli @shopify/theme
```

## 2. Mit deiner App verknüpfen

Im Ordner `shopify-app`:

```bash
cd shopify-app
shopify app config link
```

- Dev-Store wählen (z. B. testshop24-9268)
- App **testshop24** auswählen (oder die, die du im Dashboard angelegt hast)

Falls `client_id` in `shopify.app.toml` nicht passt, wird es beim Link überschrieben.

## 3. Extension deployen

```bash
shopify app deploy
```

Damit wird die Extension zu deiner App hochgeladen und erscheint in der aktuellen App-Version.

## 4. Block im Theme einbauen

1. Im **Shopify Admin**: **Online Store** → **Themes** → **Customize**
2. Eine Seite öffnen (z. B. Homepage)
3. **Add block** → unter **Apps** deine App und den Block **"App Block"** wählen
4. Überschrift und Text im rechten Panel anpassen → **Save**

Der Block wird auf der Storefront für Kunden sichtbar.

## Entwicklung (optional)

```bash
shopify app dev
```

Startet einen Tunnel und öffnet die App im Admin. Dein **Backend** weiterhin separat mit `npm run dev` im Ordner `../backend` starten.

## Struktur

```
shopify-app/
├── shopify.app.toml          # App-Config (client_id, URLs)
├── README.md                 # diese Anleitung
└── extensions/
    └── storefront-block/
        ├── shopify.extension.toml
        ├── blocks/
        │   └── app-block.liquid   # Der Block (Liquid + Schema)
        ├── assets/
        ├── snippets/
        └── locales/
```

Den Inhalt des Blocks kannst du in `extensions/storefront-block/blocks/app-block.liquid` anpassen.
