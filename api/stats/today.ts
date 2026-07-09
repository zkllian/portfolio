import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createDb, dailyStatsTable, allTimeStatsTable, userDailyStatsTable, userPresenceTable } from "@workspace/db";
import { eq, sql, gt } from "drizzle-orm";

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

const db = createDb();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method not allowed" });

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
          .where(
            sql`${userDailyStatsTable.userId} = ${userId} AND ${userDailyStatsTable.date} = ${today}`
          );
        mine = userRow?.count ?? 0;
      }

      const FIVE_MIN = 5 * 60 * 1000;
      const [onlineRow] = await db.select({ count: sql<number>`count(*)::int` }).from(userPresenceTable).where(gt(userPresenceTable.lastSeen, Date.now() - FIVE_MIN));
      const todayCount = dayRow?.count ?? 0;
      return res.json({
        date: today,
        today: todayCount,
        total: totalRow?.value ?? 0,
        mine,
        others: Math.max(0, todayCount - mine),
        online: onlineRow?.count ?? 0,
      });
    } catch (e) {
      console.error("db error", e);
    }
  }

  // No DB — return zeros gracefully
  return res.json({ date: today, today: 0, total: 0, mine: 0, others: 0, online: 0 });
}
