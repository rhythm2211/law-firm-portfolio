# Meridian Law Partners — Portfolio Demo

Full-stack law firm portfolio from the **ml-firm** design handoff, with an **AI duty counsel chatbot** and **consultation booking** backed by Express + SQLite.

> **Demo only** — Meridian Law Partners is a hypothetical firm. Chat responses are informational, not legal advice.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 3.4 |
| Backend | Express 5, SQLite (`better-sqlite3`) |
| Deploy | Docker, Railway, GitHub Actions |

## Quick start (development)

```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

npm run dev
```

- **Frontend:** http://localhost:5173 (API proxied to backend)
- **Backend API:** http://localhost:3001

## Production (single server)

Build the frontend, compile the backend, then run one process that serves both:

```bash
cd frontend && npm run build && cd ..
cd backend && npm run build && cd ..
cd backend && STATIC_DIR=../frontend/dist node dist/index.js
```

Open http://localhost:3001

## Docker

```bash
docker compose up --build
```

App: http://localhost:3001  
SQLite data: Docker volume `meridian-data` at `/data`

## GitHub

**https://github.com/rhythm2211/law-firm-portfolio**

## Deploy to Railway

Step-by-step: **[RAILWAY_SETUP.md](./RAILWAY_SETUP.md)**

Summary:

1. Railway → **New Project** → deploy **`rhythm2211/law-firm-portfolio`** from GitHub.
2. Add a **volume** at mount path **`/data`** (SQLite).
3. **Generate domain** under Networking.

Health check: `GET /api/health`

## Site structure (single page)

All sections are anchor-linked from the navbar:

| Nav link | Section id |
|----------|------------|
| Practice | `#practice` |
| Cases | `#cases` |
| People | `#people` |
| Insights | `#insights` |
| About | `#about` |

**Chat:** floating “Ask duty counsel” → `POST /api/chat`  
**Booking:** “Book consultation” → modal → `GET /api/bookings/slots`, `POST /api/bookings`

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | AI assistant reply |
| GET | `/api/bookings/slots?date=YYYY-MM-DD` | Available time slots |
| POST | `/api/bookings` | Create consultation request |
| GET | `/api/bookings` | List recent bookings |

## CI

GitHub Actions workflow `.github/workflows/docker.yml` builds the image and smoke-tests `/api/health` and `/api/chat` on push/PR.
