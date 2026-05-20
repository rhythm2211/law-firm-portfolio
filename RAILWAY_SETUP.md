# Railway deployment setup

GitHub repo: **https://github.com/rhythm2211/law-firm-portfolio**

## 1. Create the Railway project (dashboard — ~5 minutes)

1. Open [railway.app](https://railway.app) and sign in.
2. **New Project** → **Deploy from GitHub repo**.
3. Choose **`rhythm2211/law-firm-portfolio`** (authorize GitHub if prompted).
4. Railway detects the root **`Dockerfile`** and `railway.toml` automatically.
5. Wait for the first build to finish.

## 2. Add persistent storage (required for bookings + chat history)

SQLite lives at `/data` inside the container.

1. Open your service in Railway.
2. **Settings** → **Volumes** → **Add volume**.
3. Mount path: **`/data`**
4. Redeploy if prompted.

`railway.toml` sets `requiredMountPath = "/data"` so Railway will not run without this volume.

## 3. Environment variables (usually automatic)

These are set in the **Dockerfile**; override only if needed:

| Variable | Value |
|----------|--------|
| `PORT` | Set by Railway (do not hardcode) |
| `DATA_DIR` | `/data` |
| `STATIC_DIR` | `/app/frontend/dist` |
| `NODE_ENV` | `production` |

## 4. Public URL

1. Service → **Settings** → **Networking** → **Generate domain**.
2. Open the URL — you should see the Meridian site.
3. Test API: `https://YOUR-DOMAIN.up.railway.app/api/health`

## 5. Optional: CLI deploy from your machine

```bash
npm install -g @railway/cli
railway login
cd law-firm-portfolio
railway link    # pick the project + service
railway up
```

Create an API token at [railway.com/account/tokens](https://railway.com/account/tokens) for non-interactive use:

```bash
set RAILWAY_TOKEN=your_token
railway up --project YOUR_PROJECT_ID --service YOUR_SERVICE_ID
```

## 6. Optional: GitHub Actions auto-deploy

After the dashboard project exists:

1. Railway → **Account** → **Tokens** → create token.
2. GitHub repo → **Settings** → **Secrets and variables** → **Actions**:
   - `RAILWAY_TOKEN` — your token
   - `RAILWAY_PROJECT_ID` — Project → Settings → General
   - `RAILWAY_SERVICE_ID` — Service → Settings → General
3. Push to `main` or run **Actions → Deploy to Railway → Run workflow**.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on `better-sqlite3` | Dockerfile includes build tools; redeploy from latest `main`. |
| Health check fails | Ensure `/api/health` responds; check deploy logs. |
| Bookings reset after redeploy | Attach volume at `/data`. |
| 404 on page refresh | Static + SPA fallback is in `backend/src/index.ts`; use latest image. |
