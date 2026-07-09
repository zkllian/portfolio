import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function makePool() {
  const url = process.env.RAILWAY_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!url) return null;
  const ssl = /railway|neon\.tech/.test(url) && !/sslmode=/.test(url);
  return new Pool({ connectionString: url, ssl: ssl ? { rejectUnauthorized: false } : undefined });
}

const pool = makePool();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method not allowed" });

  const today = getWIBDateStr();
  const userId = String((req.query as Record<string, string>).userId ?? "");

  if (pool) {
    try {
      const [dayRow, totalRow] = await Promise.all([
        pool.query("SELECT count FROM daily_stats WHERE date = $1", [today]),
        pool.query("SELECT value FROM all_time_stats WHERE key = 'total'"),
      ]);

      let mine = 0;
      if (userId) {
        const r = await pool.query(
          "SELECT count FROM user_daily_stats WHERE user_id = $1 AND date = $2",
          [userId, today]
        );
        mine = r.rows[0]?.count ?? 0;
      }

      const ONLINE_WINDOW = 45 * 1000; // must stay in sync with the frontend heartbeat interval
      const onlineRow = await pool.query(
        "SELECT count(*)::int AS count FROM user_presence WHERE last_seen > $1",
        [Date.now() - ONLINE_WINDOW]
      );
      const visitorsRow = await pool.query("SELECT value FROM all_time_stats WHERE key = 'visitors'");

      const todayCount = dayRow.rows[0]?.count ?? 0;
      return res.json({
        date: today,
        today: todayCount,
        total: totalRow.rows[0]?.value ?? 0,
        mine,
        others: Math.max(0, todayCount - mine),
        online: onlineRow.rows[0]?.count ?? 0,
        visitorsTotal: visitorsRow.rows[0]?.value ?? 0,
      });
    } catch (e) {
      console.error("db error", e);
    }
  }

  return res.json({ date: today, today: 0, total: 0, mine: 0, others: 0, online: 0, visitorsTotal: 0 });
}
