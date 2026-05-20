# Railway deployment setup

GitHub repo: **https://github.com/rhythm2211/law-firm-portfolio**

## 1. Create the Railway project

1. Open [railway.app](https://railway.app) and sign in.
2. **New Project** → **Deploy from GitHub repo**.
3. Choose **`rhythm2211/law-firm-portfolio`**.
4. Wait for the Docker build to finish.

---

## 2. Add a volume (mount path `/data`)

Railway **does not** use a “Settings → Volumes” menu anymore. Volumes are created from the **project canvas** or the **CLI**.

### Option A — Command palette (easiest in the dashboard)

1. Open your **project** (you should see your service as a box on the canvas).
2. Press **`Ctrl+K`** (Windows) or **`⌘K`** (Mac).
3. Type **`volume`** and choose **Add Volume** / **Create Volume**.
4. Select your **law-firm-portfolio** service when asked.
5. When prompted for **mount path**, enter exactly:

   ```
   /data
   ```

6. Confirm. Railway may redeploy the service automatically.

### Option B — Right‑click the canvas

1. On the project page, **right‑click** empty space on the canvas (or on your service card).
2. Look for **Add Volume** / **Create Volume**.
3. Attach it to your app service.
4. Set mount path to **`/data`**.

### Option C — Railway CLI (if the UI is hard to find)

```bash
npm install -g @railway/cli
railway login
cd path\to\law-firm-portfolio
railway link          # pick your project + service
railway volume add --mount-path /data
```

List volumes to confirm:

```bash
railway volume list
```

---

### What the mount path means

| Field | Value for this app |
|--------|---------------------|
| **Mount path** | `/data` |
| **Why** | SQLite database file is stored at `/data/meridian.db` (`DATA_DIR=/data` in the Dockerfile) |

Do **not** use `/app/data` unless you change `DATA_DIR` — this app uses an absolute path **`/data`**.

After the volume is attached, Railway sets `RAILWAY_VOLUME_MOUNT_PATH=/data` at runtime (you do not need to add that variable manually).

---

## 3. Public URL

1. Click your **service** on the canvas.
2. **Settings** tab → **Networking** → **Generate Domain**.
3. Test: `https://YOUR-DOMAIN.up.railway.app/api/health`

---

## 4. Environment variables (defaults in Dockerfile)

| Variable | Value |
|----------|--------|
| `PORT` | Set by Railway automatically |
| `DATA_DIR` | `/data` |
| `STATIC_DIR` | `/app/frontend/dist` |

---

## 5. Optional: GitHub Actions deploy

Add secrets: `RAILWAY_TOKEN`, `RAILWAY_PROJECT_ID`, `RAILWAY_SERVICE_ID` — see README.

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| Can’t find “Volumes” in Settings | Use **Ctrl+K** → “volume”, or **right‑click canvas**, or CLI `railway volume add`. |
| Deploy fails: volume required | Add volume at `/data`, or redeploy after `railway volume add`. |
| Bookings reset after redeploy | Volume not mounted — confirm mount path is `/data`. |
| `docker VOLUME not supported` | Fixed in repo — pull latest `main`, no `VOLUME` in Dockerfile. |
