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
  res.setHeader("Cache-Control", "no-store, must-revalidate");
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const body = req.body as { userId?: string };
  const userId = String(body?.userId ?? "").trim().slice(0, 64);

  if (pool && userId) {
    try {
      await pool.query("DELETE FROM user_presence WHERE user_id = $1", [userId]);
    } catch (e) {
      console.error("db error", e);
    }
  }
  return res.json({ ok: true });
}
