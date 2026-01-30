# Einkaufsliste - Full Stack Anwendung

Eine einfache Full-Stack Shopping List Anwendung mit React, Express, TypeScript und MongoDB.

## Technologie-Stack

### Frontend
- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für das Styling (externe UI-Bibliothek)

### Backend
- **Express.js** mit TypeScript
- **Mongoose** als ODM für MongoDB

### Datenbank
- **MongoDB 7**

### Containerisierung
- **Docker** & **Docker Compose**

## Voraussetzungen

- [Docker](https://www.docker.com/get-started) (Version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (Version 2.0+)

## Setup & Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd Ecommerce-Fullstack
```

### 2. Anwendung starten

```bash
docker-compose up --build
```

Das startet alle drei Services:
- **MongoDB** auf Port `27017`
- **Backend** auf Port `3001`
- **Frontend** auf Port `5173`

### 3. Anwendung öffnen

Öffne deinen Browser und navigiere zu:

```
http://localhost:5173
```

## Projektstruktur

```
Ecommerce-Fullstack/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── controllers/
│       │   └── itemsController.ts
│       ├── services/
│       │   └── itemsService.ts
│       ├── routes/
│       │   └── items.ts
│       ├── models/
│       │   └── ShoppingItem.ts
│       └── utils/
│           ├── index.ts
│           ├── validation.ts
│           └── response.ts
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── api/
        │   ├── client.ts
        │   └── itemsApi.ts
        ├── utils/
        │   ├── index.ts
        │   ├── string.ts
        │   └── error.ts
        ├── hooks/
        │   └── useItems.ts
        ├── layouts/
        │   └── MainLayout.tsx
        ├── pages/
        │   ├── ShoppingListPage.tsx
        │   └── AboutPage.tsx
        ├── types/
        │   └── index.ts
        └── components/
            ├── AddItemForm.tsx
            ├── ShoppingList.tsx
            └── ShoppingListItem.tsx
```

## API Endpunkte

| Methode | Endpunkt | Beschreibung | Request Body |
|---------|----------|--------------|--------------|
| GET | `/items` | Alle Einkaufsitems abrufen | - |
| POST | `/items` | Neues Item hinzufügen | `{ name: string }` |
| PUT | `/items/:id` | Gekauft-Status aktualisieren | `{ bought: boolean }` |
| DELETE | `/items/:id` | Item löschen | - |

## MongoDB Datenmodell

```typescript
interface ShoppingItem {
  _id: ObjectId;
  name: string;
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Entwicklung

### Logs ansehen

```bash
# Alle Services
docker-compose logs -f

# Nur Backend
docker-compose logs -f backend

# Nur Frontend
docker-compose logs -f frontend
```

### Services neustarten

```bash
docker-compose restart
```

### Anwendung stoppen

```bash
docker-compose down
```

### Mit Daten-Löschung stoppen

```bash
docker-compose down -v
```

## Externe Bibliotheken

### Frontend
- **Tailwind CSS** - Utility-first CSS Framework für schnelles und modernes Styling

## Features

- Produkte zur Einkaufsliste hinzufügen
- Produkte als "gekauft" markieren (mit Durchstreichung)
- Produkte löschen
- Übersichtliche Trennung zwischen "Zu kaufen" und "Gekauft"
- Responsive Design für Mobile und Desktop
- Loading-States und Error-Handling

## Screenshots

Die Anwendung bietet:
- Ein modernes, ansprechendes Design mit Gradient-Hintergrund
- Ein Eingabefeld mit Button zum Hinzufügen neuer Produkte
- Eine übersichtliche Liste mit Checkbox und Lösch-Button
- Visuelle Unterscheidung zwischen gekauften und nicht-gekauften Items

---

Erstellt als Full Stack Test Aufgabe.
# ecommerce-fullstack
