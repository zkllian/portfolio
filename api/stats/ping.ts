import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createDb, dailyStatsTable, allTimeStatsTable, userDailyStatsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

const db = createDb();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const today = getWIBDateStr();
  const body = req.body as { count?: number; userId?: string };
  const raw = Number(body?.count);
  const amount = Number.isFinite(raw) && raw >= 1 ? Math.min(Math.floor(raw), 1000) : 1;
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
    } catch (e) {
      console.error("db error", e);
    }
  }

  // No DB — acknowledge silently (stats just won't persist)
  return res.json({ ok: true, date: today, today: 0, total: 0 });
}
