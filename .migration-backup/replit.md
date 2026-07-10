# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- **This repo is dual-deployed: Vercel (production, live) + Replit (editing/preview only).** The owner edits the frontend on Replit but the real production deploy is on Vercel, from the same GitHub repo.
- **Root-level `vercel.json` and `api/` (`api/index.js`, `api/package.json`) are NOT migration leftovers — do not delete them.** They are Vercel's serverless function + build config for the live site. They look redundant next to `artifacts/api-server` (the Replit-side Express API) but both must stay in sync — see "Gotchas" below.
- **`artifacts/portfolio/vite.config.ts` `build.outDir` is `dist` (not `dist/public`) on purpose** — it must match `vercel.json`'s `outputDirectory: "artifacts/portfolio/dist"`. `artifacts/portfolio/.replit-artifact/artifact.toml`'s `publicDir` is set to the same path for Replit's own static production serve. If these three ever disagree, one of the two deploy targets breaks.
- `artifacts/api-server` (Express, used for the Replit preview/dev workflow) and `api/index.js` (Vercel serverless function, used in production) implement the same stats/DB endpoints independently. They currently have some drift (DB SSL detection, table auto-bootstrap) — see Gotchas. Historically an agent deleted `vercel.json`/`api/` thinking they were dead migration residue and broke the live Vercel deploy; if importing this repo into a fresh Replit account, do NOT repeat that cleanup.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Never delete `vercel.json` or the root `api/` folder as "cleanup" — they are required for the live Vercel production deploy, which is separate from this Replit preview. If unsure whether something looks like deploy residue, ask before deleting.
- `artifacts/api-server/src/routes/stats.ts` (Replit/Express) and `api/index.js` (Vercel serverless) both implement `/api/stats*` but are two separate codebases — a fix or schema change in one must be mirrored in the other, or behavior will silently diverge between the Replit preview and the live Vercel site.
- `/api/stats/reset` has no auth guard in either backend — treat as a known, accepted risk unless asked to fix it.
- When changing `artifacts/portfolio` build output path, update all three in lockstep: `vite.config.ts` (`build.outDir`), root `vercel.json` (`outputDirectory`), and `artifacts/portfolio/.replit-artifact/artifact.toml` (`publicDir`) via `verifyAndReplaceArtifactToml` — never edit `artifact.toml` directly.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
