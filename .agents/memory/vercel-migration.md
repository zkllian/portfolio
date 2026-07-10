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
