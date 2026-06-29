import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { createDb, dailyStatsTable, allTimeStatsTable, userDailyStatsTable } from "@workspace/db";
import { eq, sql, ne } from "drizzle-orm";

const STATS_FILE = path.resolve(process.cwd(), "stats.json");
const db = createDb();

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function readFile(): { date: string; count: number; total: number } {
  try {
    if (!fs.existsSync(STATS_FILE)) return { date: getWIBDateStr(), count: 0, total: 0 };
    const data = JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
    return { date: data.date ?? getWIBDateStr(), count: data.count ?? 0, total: data.total ?? 0 };
  } catch {
    return { date: getWIBDateStr(), count: 0, total: 0 };
  }
}

function writeFile(data: { date: string; count: number; total: number }) {
  try { fs.writeFileSync(STATS_FILE, JSON.stringify(data), "utf-8"); } catch {}
}

const router: IRouter = Router();

router.get("/stats/today", async (req, res) => {
  const today = getWIBDateStr();
  const userId = String((req.query as Record<string, string>).userId ?? "");

  if (db) {
    try {
      const [dayRow] = await db.select().from(dailyStatsTable).where(eq(dailyStatsTable.date, today));
      const [totalRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "total"));

      let mine = 0;
      if (userId) {
        const [userRow] = await db
          .select()
          .from(userDailyStatsTable)
          .where(eq(userDailyStatsTable.userId, userId));
        mine = userRow?.count ?? 0;
      }

      const todayCount = dayRow?.count ?? 0;
      return res.json({
        date: today,
        today: todayCount,
        total: totalRow?.value ?? 0,
        mine,
        others: Math.max(0, todayCount - mine),
      });
    } catch {}
  }

  const f = readFile();
  const todayCount = f.date === today ? f.count : 0;
  res.json({ date: today, today: todayCount, total: f.total, mine: 0, others: todayCount });
});

router.post("/stats/ping", async (req, res) => {
  const today = getWIBDateStr();
  const body = req.body as { count?: number; userId?: string };
  const amount = Number(body?.count) || 1;
  const userId = String(body?.userId ?? "").trim().slice(0, 64);

  if (db) {
    try {
      await db
        .insert(dailyStatsTable)
        .values({ date: today, count: amount })
        .onConflictDoUpdate({
          target: dailyStatsTable.date,
          set: { count: sql`${dailyStatsTable.count} + ${amount}` },
        });

      await db
        .insert(allTimeStatsTable)
        .values({ key: "total", value: amount })
        .onConflictDoUpdate({
          target: allTimeStatsTable.key,
          set: { value: sql`${allTimeStatsTable.value} + ${amount}` },
        });

      if (userId) {
        await db
          .insert(userDailyStatsTable)
          .values({ userId, date: today, count: amount })
          .onConflictDoUpdate({
            target: [userDailyStatsTable.userId, userDailyStatsTable.date],
            set: { count: sql`${userDailyStatsTable.count} + ${amount}` },
          });
      }

      const [dayRow] = await db.select().from(dailyStatsTable).where(eq(dailyStatsTable.date, today));
      const [totalRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "total"));
      return res.json({ ok: true, date: today, today: dayRow?.count ?? amount, total: totalRow?.value ?? amount });
    } catch {}
  }

  const f = readFile();
  if (f.date !== today) { f.date = today; f.count = 0; }
  f.count += amount;
  f.total += amount;
  writeFile(f);
  res.json({ ok: true, date: today, today: f.count, total: f.total });
});

router.post("/stats/reset", async (_req, res) => {
  const today = getWIBDateStr();
  if (db) {
    try {
      await db.delete(dailyStatsTable);
      await db.delete(userDailyStatsTable);
      await db
        .insert(allTimeStatsTable)
        .values({ key: "total", value: 0 })
        .onConflictDoUpdate({
          target: allTimeStatsTable.key,
          set: { value: 0 },
        });
      return res.json({ ok: true });
    } catch {}
  }
  writeFile({ date: today, count: 0, total: 0 });
  res.json({ ok: true });
});

export default router;
