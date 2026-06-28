import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { createDb, dailyStatsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const STATS_FILE = path.resolve(process.cwd(), "stats.json");
const db = createDb();

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function readFile(): { date: string; count: number } {
  try {
    if (!fs.existsSync(STATS_FILE)) return { date: getWIBDateStr(), count: 0 };
    return JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
  } catch {
    return { date: getWIBDateStr(), count: 0 };
  }
}

function writeFile(data: { date: string; count: number }) {
  try { fs.writeFileSync(STATS_FILE, JSON.stringify(data), "utf-8"); } catch {}
}

const router: IRouter = Router();

router.get("/stats/today", async (_req, res) => {
  const today = getWIBDateStr();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(dailyStatsTable)
        .where(eq(dailyStatsTable.date, today));
      return res.json({ date: today, count: rows[0]?.count ?? 0 });
    } catch {}
  }
  const f = readFile();
  res.json({ date: today, count: f.date === today ? f.count : 0 });
});

router.post("/stats/ping", async (req, res) => {
  const today = getWIBDateStr();
  const amount = Number((req.body as { count?: number })?.count) || 1;
  if (db) {
    try {
      await db
        .insert(dailyStatsTable)
        .values({ date: today, count: amount })
        .onConflictDoUpdate({
          target: dailyStatsTable.date,
          set: { count: sql`${dailyStatsTable.count} + ${amount}` },
        });
      const rows = await db
        .select()
        .from(dailyStatsTable)
        .where(eq(dailyStatsTable.date, today));
      return res.json({ ok: true, date: today, count: rows[0]?.count ?? amount });
    } catch {}
  }
  const f = readFile();
  if (f.date !== today) { f.date = today; f.count = 0; }
  f.count += amount;
  writeFile(f);
  res.json({ ok: true, date: today, count: f.count });
});

export default router;
