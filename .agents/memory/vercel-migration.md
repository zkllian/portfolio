---
name: Vercel pnpm workspace migration
description: Lessons from porting an already-structured pnpm workspace app from Vercel to Replit
---

# Vercel pnpm workspace migration

## Key findings

**Why:** Captures non-obvious issues hit during the port so future migrations avoid the same stumbling blocks.

### react-icons/si icon names differ from brand names
`SiCanva` does not exist — the correct export is `SiCanvas`. Always grep the installed package (`grep "SiCanva\|SiDrizzle" node_modules/.pnpm/react-icons@*/node_modules/react-icons/si/index.mjs`) before assuming an icon name matches the brand.

**How to apply:** Any time Tentang.tsx or similar imports from `react-icons/si`, verify each icon name exists in the installed version.

### @workspace/api-zod reference in scaffold health.ts
The scaffold's `artifacts/api-server/src/routes/health.ts` imports `HealthCheckResponse` from `@workspace/api-zod`. When not using the codegen stack, replace with a plain `res.json({ status: "ok" })`.

**How to apply:** After creating a new api-server artifact, check health.ts for `@workspace/api-zod` imports if not using the OpenAPI codegen workflow.

### lib/db/src/index.ts throws on missing DATABASE_URL by default
The scaffold's `lib/db/src/index.ts` throws if `DATABASE_URL` is absent. The backup used `createDb()` that returns `null` gracefully. When the app has a file-based fallback for stats, use the null-return pattern so the server starts without a DB.

**How to apply:** For apps with optional DB, replace the throw with a `createDb()` function returning `null` when the URL is absent.

### content.ts footer key must be nested inside tentang/tentangEN
Tentang.tsx accesses `t.footer` where `t` is `content.tentang` or `content.tentangEN`. The `footer` object must be inside each language variant, not at the top level of `content`.

### geist peer dep warning for next is harmless
`geist@1.7.2` declares `next@>=13.2.0` as a peer dep, but works fine in Vite without Next.js. The pnpm warning is safe to ignore.

### .migration-backup gets auto-registered as duplicate artifacts
If `.migration-backup/` still contains `.replit-artifact/artifact.toml` files, the platform's auto-detection can register its contents as separate (duplicate) artifacts/workflows alongside the real ones, even with bogus titles derived from package.json.

**Why:** Auto-registration scans for artifact.toml files anywhere in the tree, not just under the canonical `artifacts/` dir.

**How to apply:** Once real content has been copied out of `.migration-backup` into the live `artifacts/*` dirs, delete `.migration-backup` entirely (or at least its `.replit-artifact` dirs) before finishing the port — don't leave it sitting around "for reference".

### Root-level vercel.json and api/ dir are NOT always deletable — check for dual-deploy first
CORRECTION (this was wrong): an imported Vercel app's root `vercel.json` and root `api/*.js` can still be the live production deploy config if the owner keeps deploying the same repo to Vercel while using Replit only to edit the frontend. Deleting them broke a real production site.

**Why:** "Looks unused from inside Replit" isn't the same as "unused" — Vercel deploy config isn't invoked by anything in the Replit workspace, so its absence is invisible until the owner's next Vercel deploy.

**How to apply:** Before deleting `vercel.json` or a root `api/` dir during a migration cleanup, ask the user whether they still deploy this repo to Vercel (or any other platform) directly. If yes, keep the files, and instead document the dual-deploy setup in `replit.md` (architecture decisions + gotchas) so neither this agent nor a future one re-deletes them — e.g. keep `vite.config.ts` build.outDir, `vercel.json` outputDirectory, and the Replit artifact.toml's publicDir all pointing at the same path.
