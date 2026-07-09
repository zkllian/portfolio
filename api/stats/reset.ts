import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

function makePool() {
  const url = process.env.RAILWAY_DATABASE_URL ?? process.env.DATABASE_URL;
  if (!url) return null;
  const ssl = /railway|neon\.tech/.test(url) && !/sslmode=/.test(url);
  return new Pool({ connectionString: url, ssl: ssl ? { rejectUnauthorized: false } : undefined });
}

const pool = makePool();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  if (pool) {
    try {
      await pool.query("DELETE FROM daily_stats");
      await pool.query("DELETE FROM user_daily_stats");
      await pool.query(
        `INSERT INTO all_time_stats (key, value) VALUES ('total', 0)
         ON CONFLICT (key) DO UPDATE SET value = 0`
      );
      return res.json({ ok: true });
    } catch (e) {
      console.error("db error", e);
      return res.status(500).json({ ok: false, error: "db error" });
    }
  }

  return res.json({ ok: true });
}
