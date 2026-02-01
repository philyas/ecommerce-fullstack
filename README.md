# Listify - Full Stack Anwendung

Eine Full-Stack Shopping-List-Anwendung mit React, Express, TypeScript und MongoDB. Die Codebasis folgt Clean Code, SOLID-Prinzipien und Clean-Architecture-Grundsätzen.

## Technologie-Stack

### Frontend
- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für das Styling

### Backend
- **Express.js** mit TypeScript
- **Mongoose** als ODM für MongoDB

### Datenbank
- **MongoDB 7**

### Containerisierung
- **Docker** & **Docker Compose**

## Voraussetzungen

- [Docker](https://www.docker.com/get-started) (Version 20.10+)
- [Node.js](https://nodejs.org/) (Version 18+) – für lokale Entwicklung
- npm (kommt mit Node.js)

## Setup & Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd Ecommerce-Fullstack
```

### 2. Anwendung starten

```bash
docker compose up --build
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
│       ├── config/
│       │   └── index.ts           # Zentralisierte Konfiguration
│       ├── types/
│       │   └── index.ts            # DTOs, Interfaces (Dependency Inversion)
│       ├── middleware/
│       │   ├── index.ts
│       │   └── validation.ts       # Request-Validierung (SRP)
│       ├── controllers/
│       │   └── itemsController.ts
│       ├── services/
│       │   └── itemsService.ts    # Business-Logik, IItemsService
│       ├── models/
│       │   └── ShoppingItem.ts
│       ├── routes/
│       │   └── items.ts
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
        ├── constants/
        │   └── index.ts            # Zentrale Konstanten (keine Magic Numbers)
        ├── utils/
        │   ├── index.ts
        │   ├── string.ts
        │   └── error.ts
        ├── hooks/
        │   ├── index.ts
        │   ├── useItems.ts
        │   └── useModal.ts         # Gemeinsame Modal-Logik (DRY)
        ├── layouts/
        │   └── MainLayout.tsx
        ├── pages/
        │   ├── ShoppingListPage.tsx
        │   └── AboutPage.tsx
        ├── types/
        │   └── index.ts
        └── components/
            ├── index.ts
            ├── AddItemForm.tsx
            ├── ConfirmModal.tsx
            ├── CongratsModal.tsx
            ├── EditQuantityModal.tsx
            ├── LoadingSpinner.tsx  # Wiederverwendbarer Spinner
            ├── QuantityStepper.tsx
            ├── ShoppingList.tsx
            ├── ShoppingListItem.tsx
            └── Toast.tsx
```

## Architektur (Clean Code / SOLID / Clean Architecture)

- **Backend**: Controller → Middleware (Validierung) → Service (Interface) → Model. Konfiguration und Types zentral.
- **Frontend**: Konstanten und Types zentral, `useModal` und `LoadingSpinner` für DRY, Sub-Komponenten für SRP.
- **SOLID**: Service-Interface (D), Validierung in Middleware (S), kleine fokussierte Interfaces (I).

## API Endpunkte

| Methode | Endpunkt       | Beschreibung           | Request Body |
|--------|----------------|------------------------|--------------|
| GET    | `/items`       | Alle Items abrufen     | –            |
| POST   | `/items`       | Neues Item hinzufügen | `{ name: string, quantity?: number }` |
| PUT    | `/items/:id`   | Item aktualisieren     | `{ bought?: boolean, quantity?: number }` |
| DELETE | `/items/clear` | Alle Items löschen     | –            |
| DELETE | `/items/:id`   | Einzelnes Item löschen | –            |

**Health Check:** `GET /health` – liefert `{ status: "ok", timestamp: string }`.

## MongoDB Datenmodell

```typescript
interface ShoppingItem {
  _id: ObjectId;
  name: string;
  quantity: number;  // 1–999
  bought: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Entwicklung

### Option A: Nur Datenbank mit Docker (empfohlen für Entwicklung)

Starte nur MongoDB mit Docker und führe Frontend/Backend lokal aus:

```bash
# 1. Nur MongoDB starten
docker compose up -d mongodb

# 2. Backend starten (in neuem Terminal)
cd backend
npm install
npm start

# 3. Frontend starten (in neuem Terminal)
cd frontend
npm install
npm start
```

Das Backend läuft dann auf `http://localhost:3001`, das Frontend auf `http://localhost:5173`.

### Option B: Alles mit Docker

```bash
docker compose up --build
```

### Logs ansehen

```bash
# Alle Services
docker compose logs -f

# Nur Backend
docker compose logs -f backend

# Nur Frontend
docker compose logs -f frontend
```

### Services neustarten

```bash
docker compose restart
```

### Anwendung stoppen

```bash
docker compose down
```

### Mit Daten-Löschung stoppen

```bash
docker compose down -v
```

## Features

- Produkte zur Liste hinzufügen (Name + Menge 1–999)
- Produktmenge anpassen (+/- Stepper, Modal für direkte Eingabe)
- Produkte als „gekauft“ markieren (mit Check-Animation)
- Einzelne Produkte löschen (mit Bestätigungsdialog)
- Alle Produkte löschen („Alle löschen“ mit Bestätigung)
- Übersichtliche Trennung zwischen „Offen“ und „Erledigt“
- Glückwunsch-Modal, wenn alle Items erledigt sind
- Toast-Benachrichtigungen bei Aktionen
- Responsive Design für Mobile und Desktop
- Loading-States und zentrales Error-Handling

## Screenshots

Die Anwendung bietet:
- Ein modernes, ansprechendes Design mit klarem Layout
- Ein Eingabefeld mit Mengen-Stepper und Button zum Hinzufügen
- Eine übersichtliche Liste mit Checkbox, Mengen-Stepper und Lösch-Button
- Visuelle Unterscheidung zwischen gekauften und nicht-gekauften Items
- Modals für Bestätigung und Mengen-Eingabe

---

Erstellt als Full-Stack-Testaufgabe.
