# barcode-gen

A portfolio + barcode generator for IMEI numbers. Indonesian-language UI with a dark/light theme toggle, animated floating nav, and a per-day stats counter backed by Postgres (with file-based fallback).

## Run & Operate

- `pnpm --filter @workspace/barcode-gen run dev` — run the frontend (port 21427)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (optional; falls back to file-based stats)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (wouter routing, JsBarcode, custom CSS, Geist + SF Pro fonts)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (optional — graceful null fallback in `lib/db/src/index.ts`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/barcode-gen/` — React+Vite frontend
- `artifacts/api-server/` — Express API (stats routes at `/api/stats/`)
- `lib/db/` — Drizzle ORM, schema in `lib/db/src/schema/stats.ts`
- `artifacts/barcode-gen/public/` — SF Pro fonts, avatar, template image, favicon

## Architecture decisions

- `lib/db/src/index.ts` exports `createDb()` which returns `null` if `DATABASE_URL` is unset (instead of throwing). Stats routes gracefully fall back to a local `stats.json` file.
- Stats API lives at `/api/stats/today` (GET), `/api/stats/ping` (POST), `/api/stats/reset` (POST).
- Routing is handled by wouter; pages are `Home` and `Tentang` (About).
- CSS is fully custom (no Tailwind); dark/light themes use `data-theme` on `<html>`.
- Barcode generation uses JsBarcode rendering to a Canvas element.

## Product

- Paste a list of IMEI numbers → click "execute" → get downloadable barcode images
- Daily counter tracks how many barcodes were generated today
- "Tentang" page is a CV/portfolio page for the author

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `DATABASE_URL` is optional; if absent, the API falls back to `stats.json` in the api-server's working directory.
- Fonts are served from `/public/` (SF Pro OTF files). Google Fonts (Geist) are loaded via CDN in `index.html`.
- Run `pnpm --filter @workspace/db run push` after any schema changes to sync the DB.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
