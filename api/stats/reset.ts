import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createDb, dailyStatsTable, allTimeStatsTable, userDailyStatsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const db = createDb();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  if (db) {
    try {
      await db.delete(dailyStatsTable);
      await db.delete(userDailyStatsTable);
      await db
        .insert(allTimeStatsTable)
        .values({ key: "total", value: 0 })
        .onConflictDoUpdate({
          target: allTimeStatsTable.key,
          set: { value: sql`${0}` },
        });
      return res.json({ ok: true });
    } catch (e) {
      console.error("db error", e);
      return res.status(500).json({ ok: false, error: "db error" });
    }
  }

  return res.json({ ok: true });
}
