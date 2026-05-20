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

## Deploy to Railway

1. Push this repo to GitHub.
2. In [Railway](https://railway.app), **New Project → Deploy from GitHub repo**.
3. Railway detects `Dockerfile` / `railway.toml` and builds the image.
4. Add a **volume** mounted at `/data` (for SQLite persistence).
5. Set **PORT** (Railway injects this automatically).
6. Optional env:
   - `DATA_DIR=/data`
   - `STATIC_DIR=/app/frontend/dist` (default in image)

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
