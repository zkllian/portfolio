import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function makePool() {
  const url = process.env.RAILWAY_DATABASE_URL;
  if (!url) return null;
  const ssl = /railway|neon\.tech/.test(url) && !/sslmode=/.test(url);
  return new Pool({ connectionString: url, ssl: ssl ? { rejectUnauthorized: false } : undefined });
}

const pool = makePool();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const today = getWIBDateStr();
  const body = req.body as { count?: number; userId?: string };
  const raw = Number(body?.count);
  const amount = Number.isFinite(raw) && raw >= 1 ? Math.min(Math.floor(raw), 1000) : 1;
  const userId = String(body?.userId ?? "").trim().slice(0, 64);

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO daily_stats (date, count) VALUES ($1, $2)
         ON CONFLICT (date) DO UPDATE SET count = daily_stats.count + $2`,
        [today, amount]
      );
      await pool.query(
        `INSERT INTO all_time_stats (key, value) VALUES ('total', $1)
         ON CONFLICT (key) DO UPDATE SET value = all_time_stats.value + $1`,
        [amount]
      );
      if (userId) {
        await pool.query(
          `INSERT INTO user_daily_stats (user_id, date, count) VALUES ($1, $2, $3)
           ON CONFLICT (user_id, date) DO UPDATE SET count = user_daily_stats.count + $3`,
          [userId, today, amount]
        );
        await pool.query(
          `INSERT INTO user_presence (user_id, last_seen) VALUES ($1, $2)
           ON CONFLICT (user_id) DO UPDATE SET last_seen = $2`,
          [userId, Date.now()]
        );
      }
      const [dayRow, totalRow] = await Promise.all([
        pool.query("SELECT count FROM daily_stats WHERE date = $1", [today]),
        pool.query("SELECT value FROM all_time_stats WHERE key = 'total'"),
      ]);
      return res.json({ ok: true, date: today, today: dayRow.rows[0]?.count ?? amount, total: totalRow.rows[0]?.value ?? amount });
    } catch (e) {
      console.error("db error", e);
    }
  }

  return res.json({ ok: true, date: today, today: 0, total: 0 });
}
