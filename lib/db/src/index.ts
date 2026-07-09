import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

export * from "./schema";

export function createDb() {
  const url = process.env.RAILWAY_DATABASE_URL;
  if (!url) return null;

  const needsSsl = (url.includes("neon.tech") || url.includes("railway")) && !/sslmode=/.test(url);
  const pool = new Pool({
    connectionString: url,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });
  return drizzle(pool, { schema });
}
