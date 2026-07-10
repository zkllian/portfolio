import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { visits } from "@workspace/db";
import { eq, and, gt, sql } from "drizzle-orm";

const router: IRouter = Router();

// WIB = UTC+7
function wibDateStr(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

// ONLINE threshold: 60 seconds (heartbeat every 20s)
const ONLINE_MS = 60_000;

// POST /stats/visit  — upsert session, update last_seen
router.post("/stats/visit", async (req, res) => {
  const { userId } = req.body as { userId?: string };
  if (!userId) { res.status(400).json({ error: "userId required" }); return; }

  const visitDate = wibDateStr();
  const now = Date.now();

  await db
    .insert(visits)
    .values({ userId, visitDate, lastSeen: now })
    .onConflictDoUpdate({
      target: [visits.userId, visits.visitDate],
      set: { lastSeen: now },
    });

  res.json({ ok: true });
});

// POST /stats/leave  — mark user offline
router.post("/stats/leave", async (req, res) => {
  const { userId } = req.body as { userId?: string };
  if (!userId) { res.status(400).json({ error: "userId required" }); return; }

  const visitDate = wibDateStr();

  await db
    .update(visits)
    .set({ lastSeen: 0 })
    .where(and(eq(visits.userId, userId), eq(visits.visitDate, visitDate)));

  res.json({ ok: true });
});

// GET /stats/today?userId=...
router.get("/stats/today", async (req, res) => {
  const userId = String(req.query["userId"] ?? "");
  const visitDate = wibDateStr();
  const onlineThreshold = Date.now() - ONLINE_MS;

  const [todayRow] = await db
    .select({ count: sql<number>`count(distinct ${visits.userId})::int` })
    .from(visits)
    .where(eq(visits.visitDate, visitDate));

  const [totalRow] = await db
    .select({ count: sql<number>`count(distinct ${visits.userId})::int` })
    .from(visits);

  const [onlineRow] = await db
    .select({ count: sql<number>`count(distinct ${visits.userId})::int` })
    .from(visits)
    .where(gt(visits.lastSeen, onlineThreshold));

  const today = todayRow?.count ?? 0;
  const total = totalRow?.count ?? 0;
  const online = onlineRow?.count ?? 0;

  // mine = 1 if this userId has a visit today, else 0
  const [mineRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(visits)
    .where(and(eq(visits.userId, userId), eq(visits.visitDate, visitDate)));
  const mine = mineRow?.count ? 1 : 0;
  const others = Math.max(0, today - mine);

  res.json({ today, total, mine, others, online });
});

// POST /stats/ping  — record IMEI generation (fire-and-forget, just 200 OK)
router.post("/stats/ping", async (_req, res) => {
  res.json({ ok: true });
});

// POST /stats/reset  — wipe all visit data
router.post("/stats/reset", async (_req, res) => {
  await db.delete(visits);
  res.json({ ok: true });
});

export default router;
