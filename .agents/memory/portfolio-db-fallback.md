---
name: Portfolio stats DB fallback and schema push
description: Why the visitor/online counter silently showed 0 in this project and how it was fixed
---

`lib/db/src/index.ts` `createDb()` falls back to Replit's built-in `DATABASE_URL` when `RAILWAY_DATABASE_URL` is unset. `db` being truthy is not enough — the Postgres tables must actually exist, or every query throws, is caught silently, and the API falls through to the file-based stats fallback (which has no online/presence tracking, always reports `online: 0`).

**Why:** stats routes wrap all db calls in try/catch with no logging, so a missing-tables failure looks identical to "no db configured" — very easy to misdiagnose as a frontend/reset bug.

**How to apply:** after connecting or changing the stats DB, always run `pnpm --filter @workspace/db run push` and verify with `psql "$DATABASE_URL" -c "\dt"` before assuming the online counter is broken elsewhere.
