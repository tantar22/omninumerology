# Deploying OmniNumerology (Free Split Hosting)

OmniNumerology uses a **split-hosting** architecture to stay entirely free:

- **Frontend** — Next.js static export (`out/`) served by **Firebase Hosting (Spark plan, free)**.
- **Backend** — the Express API (`src/server`) deployed separately to any free Node.js host
  (Cloud Run, Render, Railway, Fly.io, Oracle Cloud, or a VPS).

The frontend calls the backend through an absolute URL (`NEXT_PUBLIC_API_BASE`), so the two
can live on completely different domains.

## Why split hosting?

Firebase Cloud Functions require the **Blaze (pay-as-you-go) plan**. To keep everything free,
the API is hosted elsewhere while the static frontend stays on Firebase Hosting's free Spark tier.

## Architecture

```
Browser  ──►  Firebase Hosting (static out/)  ──►  NEXT_PUBLIC_API_BASE  ──►  Express API
```

- Frontend call sites (`useMatrix`, `useOracle`, `useAssistant`, `SynastryMatrix`, `NameOptimizer`)
  resolve their API URL through `src/lib/api.ts`, which prepends `NEXT_PUBLIC_API_BASE` when set.
- When `NEXT_PUBLIC_API_BASE` is empty, requests hit same-origin `/api/*` (local dev proxy).
- The backend enables CORS via `app.use(cors())`, so any host can serve it.

## Step 1 — Deploy the backend

Pick any free Node.js host. The backend needs only `express`, `cors`, and `zod`.

### Option A — Docker (Cloud Run, Fly.io, Railway, Render "Dockerfile")

A `Dockerfile` is included. Build and run:

```bash
docker build -t omninumerology-api .
docker run -p 4000:4000 -e PORT=4000 omninumerology-api
```

Push the image to your host's registry and deploy. The container exposes port `4000`.

### Option B — Native Node (Render, Railway, Oracle VM, VPS)

Use Node 20 LTS.

```bash
npm ci
npm run build:server
npm run start:prod
```

This compiles the server to `dist/` and runs `dist/server/index.js` on `$PORT` (default `4000`).

Whichever option you choose, note the **public URL** of the running API, e.g.
`https://omninumerology-api.onrender.com`.

## Step 2 — Build the frontend against that URL

Set `NEXT_PUBLIC_API_BASE` to the backend URL and export the static site:

```bash
NEXT_PUBLIC_API_BASE=https://omninumerology-api.onrender.com npm run export
```

This inlines the backend URL into the static bundle in `out/`. Confirm it took effect:

```bash
grep -rl "omninumerology-api.onrender.com" out/_next/static/chunks/ | head
```

## Step 3 — Deploy the frontend to Firebase Hosting (free)

### One-time setup

```bash
npm install -g firebase-tools
firebase login
firebase use --add   # or edit .firebaserc with your project id
```

### Deploy

```bash
firebase deploy --only hosting
```

The `predeploy` hook in `firebase.json` runs `npm run export` automatically, then uploads `out/`.
You can also run `firebase deploy` (hosting is now the only target in `firebase.json`).

## Verify

```bash
# Backend health
curl https://omninumerology-api.onrender.com/api/health

# Frontend served
curl https://<your-project>.web.app/

# Open the app and run a calculation to confirm the browser reaches the backend.
```

## Local development

```bash
npm run dev
```

This starts Next.js (`:3000`) and the API (`:4000`) together. The Next.js dev server proxies
`/api/*` to the backend, so no `NEXT_PUBLIC_API_BASE` is needed locally.

## Optional LLM assistant

Without configuration, the assistant answers from its built-in knowledge base only. To enable the
LLM layer, set these environment variables on the **backend** host:

```bash
USER_LLM_API_KEY=your-api-key
USER_LLM_BASE_URL=https://api.openai.com/v1
USER_LLM_MODEL=gpt-4o-mini
```

## Notes

- No database is required; the API runs fully in-memory. `DATABASE_URL` and `REDIS_URL` are optional
  and degrade gracefully when unset.
- `dist/`, `out/`, and `.next/` are build outputs and are gitignored.
- The old `functions/` directory and `tsconfig.functions.json` are unused leftovers from the
  Cloud Functions attempt and can be ignored.
