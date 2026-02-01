# Listify - Full Stack Anwendung

Eine Full-Stack Shopping-List-Anwendung mit React, Express, TypeScript und MongoDB.

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

- [Node.js](https://nodejs.org/) (Version 18+) und npm – für lokale Installation und Start
- Optional: [Docker](https://www.docker.com/get-started) (Version 20.10+) – für Datenbank oder kompletten Stack in Containern

## Setup & Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd Ecommerce-Fullstack
```

### 2. Anwendung starten

Du kannst **mit Docker** (alles in Containern) oder **ohne Docker** (Frontend und Backend lokal installieren und starten) arbeiten.

---

#### Variante A: Alles mit Docker

```bash
docker compose up --build
```

Das startet alle drei Services:
- **MongoDB** auf Port `27017`
- **Backend** auf Port `3001`
- **Frontend** auf Port `5173`

---

#### Variante B: Ohne Docker – Frontend und Backend lokal

Frontend und Backend werden lokal mit Node.js installiert und gestartet. Die Datenbank kannst du **entweder** lokal installieren **oder** nur MongoDB per Docker laufen lassen.

**Schritt 1 – Datenbank (eine der beiden Optionen):**

- **Option 1 – Nur MongoDB mit Docker (empfohlen):**  
  ```bash
  docker compose up -d mongodb
  ```  
  MongoDB läuft dann auf `localhost:27017`. Backend und Frontend laufen weiter auf deinem Rechner.

- **Option 2 – MongoDB lokal:**  
  MongoDB (z. B. Version 7) lokal installieren und starten, sodass es unter `localhost:27017` erreichbar ist.

**Schritt 2 – Backend installieren und starten**

```bash
cd backend
npm install
npm start
```

Backend läuft auf `http://localhost:3001` und verbindet sich mit MongoDB unter `localhost:27017` (oder mit `MONGODB_URI` aus der Umgebung).

**Schritt 3 – Frontend installieren und starten** (in neuem Terminal)

```bash
cd frontend
npm install
npm start
```

Frontend läuft auf `http://localhost:5173` und spricht mit dem Backend unter `http://localhost:3001` (oder `VITE_API_URL`).

**Umgebungsvariablen (optional):**

- Backend: `PORT`, `MONGODB_URI` (Standard: `mongodb://localhost:27017/shopping_list`)
- Frontend: `VITE_API_URL` (Standard: `http://localhost:3001`)

---

### 3. Anwendung öffnen

Im Browser:

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

- **Ohne Docker:** Siehe **Setup & Installation → Variante B** (MongoDB optional mit `docker compose up -d mongodb`, Backend und Frontend lokal mit `npm install` und `npm start`).
- **Alles mit Docker:** `docker compose up --build` (siehe **Variante A** oben).

### Logs ansehen (nur bei Docker)

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

---

Erstellt als Full-Stack-Testaufgabe.
