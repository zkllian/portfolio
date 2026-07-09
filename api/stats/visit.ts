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
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const today = getWIBDateStr();
  const body = req.body as { userId?: string };
  const userId = String(body?.userId ?? "").trim().slice(0, 64);

  if (pool) {
    try {
      if (userId) {
        await pool.query(
          `INSERT INTO user_presence (user_id, last_seen) VALUES ($1, $2)
           ON CONFLICT (user_id) DO UPDATE SET last_seen = $2`,
          [userId, Date.now()]
        );

        const inserted = await pool.query(
          "INSERT INTO user_visit_daily (user_id, date) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING 1",
          [userId, today]
        );

        if ((inserted.rowCount ?? 0) > 0) {
          await pool.query(
            `INSERT INTO daily_visits (date, count) VALUES ($1, 1)
             ON CONFLICT (date) DO UPDATE SET count = daily_visits.count + 1`,
            [today]
          );
          await pool.query(
            `INSERT INTO all_time_stats (key, value) VALUES ('visitors', 1)
             ON CONFLICT (key) DO UPDATE SET value = all_time_stats.value + 1`
          );
        }
      }

      const visitorsRow = await pool.query("SELECT value FROM all_time_stats WHERE key = 'visitors'");
      return res.json({ ok: true, visitorsTotal: visitorsRow.rows[0]?.value ?? 0 });
    } catch (e) {
      console.error("db error", e);
    }
  }

  return res.json({ ok: true, visitorsTotal: 0 });
}
