# TinyLink - Next.js Take-Home Assignment

This repository is a complete starter implementation of the TinyLink assignment (URL shortener) using **Next.js (App Router)** and **Prisma** for PostgreSQL.

## Features implemented
- Create short links (optional custom code)
- Redirect `/:code` (HTTP 302) with click count increment and last clicked time update
- Delete link
- Dashboard: list, create, delete, copy short link
- Stats page: `/code/:code`
- Health check: `/healthz`
- API endpoints:
  - `POST /api/links` → create (409 if code exists)
  - `GET /api/links` → list all
  - `GET /api/links/:code` → get one link
  - `DELETE /api/links/:code` → delete link

## Conventions (important for autograding)
- Stable routes:
  - `/` — Dashboard
  - `/code/:code` — Stats page
  - `/:code` — Redirect (302 or 404)
- Health endpoint:
  - `GET /healthz` returns `200` and JSON `{ "ok": true, "version": "1.0" }`
- Codes follow the regex: `[A-Za-z0-9]{6,8}`

## Quick start (local)

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example` and set `DATABASE_URL` (Postgres). For local testing you can use a local Postgres or SQLite (adjust Prisma datasource).

3. Initialize Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run dev server:
```bash
npm run dev
# open http://localhost:3000
```

## Deployment (recommended: Vercel + Neon Postgres)

1. Push this repo to GitHub.
2. Create a Neon (or any Postgres) database and copy the `DATABASE_URL`.
3. Create a new Vercel project, connect to the GitHub repo.
4. In Vercel project settings, add environment variables from `.env.example`:
   - `DATABASE_URL`
   - `BASE_URL` (e.g., https://your-project.vercel.app)
5. Add a build command: `npm run build` (Vercel defaults are fine).
6. Deploy. After deployment, run the Prisma migrations manually (see notes below).

### Important: Running Prisma Migrations on Vercel / Production
Vercel does not run `prisma migrate` automatically. After deploying:
- Use a CI job or run locally with your production DATABASE_URL set, then run:
```bash
npx prisma migrate deploy
```
One-time migration is needed to create the `Link` table in your production database.

## Files of interest
- `app/page.jsx` — Dashboard (client component)
- `app/code/[code]/page.jsx` — Stats page
- `app/[code]/route.js` — Redirect route
- `app/api/links/route.js` — create/list
- `app/api/links/[code]/route.js` — get/delete
- `prisma/schema.prisma` — DB schema
- `lib/prisma.js` — Prisma client singleton

## Notes & Next steps
- This project uses **plain CSS** for simplicity. You can swap to Tailwind if desired.
- For production, consider adding rate-limiting, authentication (if required), analytics, and better validation.
- Make sure to include the ChatGPT transcript (if you used LLM help) when submitting.

---

If you want, I can:
- Push this scaffold to a GitHub repo for you (I can provide instructions / a script).
- Prepare a demo video script (included).
- Help you deploy to Vercel step-by-step.
