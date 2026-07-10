import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, integer, bigint, primaryKey } from "drizzle-orm/pg-core";
import { eq, sql, gt } from "drizzle-orm";

const { Pool } = pg;

// ── Schema (inlined from lib/db) ────────────────────────────────────────────
const dailyStatsTable = pgTable("daily_stats", {
  date: text("date").primaryKey(),
  count: integer("count").notNull().default(0),
});

const allTimeStatsTable = pgTable("all_time_stats", {
  key: text("key").primaryKey(),
  value: integer("value").notNull().default(0),
});

const userDailyStatsTable = pgTable("user_daily_stats", {
  userId: text("user_id").notNull(),
  date: text("date").notNull(),
  count: integer("count").notNull().default(0),
}, (t) => [primaryKey({ columns: [t.userId, t.date] })]);

const userPresenceTable = pgTable("user_presence", {
  userId: text("user_id").primaryKey(),
  lastSeen: bigint("last_seen", { mode: "number" }).notNull(),
});

const dailyVisitsTable = pgTable("daily_visits", {
  date: text("date").primaryKey(),
  count: integer("count").notNull().default(0),
});

const userVisitDailyTable = pgTable("user_visit_daily", {
  userId: text("user_id").notNull(),
  date: text("date").notNull(),
}, (t) => [primaryKey({ columns: [t.userId, t.date] })]);

// ── DB init ──────────────────────────────────────────────────────────────────
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // Enable SSL for common hosted providers that require it
  const needsSsl = /neon\.tech|supabase\.com|railway\.app|rlwy\.net|render\.com/.test(url) && !/sslmode=/.test(url);
  const pool = new Pool({
    connectionString: url,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
  });
  const schema = { dailyStatsTable, allTimeStatsTable, userDailyStatsTable, userPresenceTable, dailyVisitsTable, userVisitDailyTable };
  return drizzle(pool, { schema });
}

const db = createDb();

// Auto-create tables on first use so no manual SQL step is needed
async function ensureTables() {
  if (!db) return;
  try {
    const pool = db.$client;
    await pool.query(`
      CREATE TABLE IF NOT EXISTS daily_stats (
        date TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS all_time_stats (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS user_daily_stats (
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (user_id, date)
      );
      CREATE TABLE IF NOT EXISTS user_presence (
        user_id TEXT PRIMARY KEY,
        last_seen BIGINT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS daily_visits (
        date TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS user_visit_daily (
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        PRIMARY KEY (user_id, date)
      );
      INSERT INTO all_time_stats (key, value) VALUES ('visitors', 0) ON CONFLICT DO NOTHING;
      INSERT INTO all_time_stats (key, value) VALUES ('total', 0) ON CONFLICT DO NOTHING;
    `);
  } catch (e) {
    console.error("[db] ensureTables failed:", e.message);
  }
}

ensureTables();

// ── Fallback file ────────────────────────────────────────────────────────────
const STATS_FILE = path.resolve(process.cwd(), "stats.json");

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function readFile() {
  try {
    if (!fs.existsSync(STATS_FILE)) return { date: getWIBDateStr(), count: 0, total: 0, visitors: 0, visitDate: getWIBDateStr(), visitedIds: [] };
    const data = JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
    return {
      date: data.date ?? getWIBDateStr(),
      count: data.count ?? 0,
      total: data.total ?? 0,
      visitors: data.visitors ?? 0,
      visitDate: data.visitDate ?? getWIBDateStr(),
      visitedIds: Array.isArray(data.visitedIds) ? data.visitedIds : [],
    };
  } catch {
    return { date: getWIBDateStr(), count: 0, total: 0, visitors: 0, visitDate: getWIBDateStr(), visitedIds: [] };
  }
}

function writeFile(data) {
  try { fs.writeFileSync(STATS_FILE, JSON.stringify(data), "utf-8"); } catch {}
}

// ── Express app ──────────────────────────────────────────────────────────────
const app = express();
app.set("etag", false);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, noimageindex");
  next();
});
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store, must-revalidate");
  next();
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/stats/today", async (req, res) => {
  const today = getWIBDateStr();
  const userId = String(req.query.userId ?? "");
  if (db) {
    try {
      const [dayRow] = await db.select().from(dailyStatsTable).where(eq(dailyStatsTable.date, today));
      const [totalRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "total"));
      let mine = 0;
      if (userId) {
        const [userRow] = await db.select().from(userDailyStatsTable)
          .where(sql`${userDailyStatsTable.userId} = ${userId} AND ${userDailyStatsTable.date} = ${today}`);
        mine = userRow?.count ?? 0;
      }
      const [visitorsRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "visitors"));
      const ONLINE_WINDOW = 45 * 1000;
      const [onlineRow] = await db.select({ count: sql`count(*)::int` }).from(userPresenceTable)
        .where(gt(userPresenceTable.lastSeen, Date.now() - ONLINE_WINDOW));
      const todayCount = dayRow?.count ?? 0;
      return res.json({ date: today, today: todayCount, total: totalRow?.value ?? 0, mine, others: Math.max(0, todayCount - mine), online: onlineRow?.count ?? 0, visitorsTotal: visitorsRow?.value ?? 0 });
    } catch (e) { console.error("[db] today error:", e.message); }
  }
  const f = readFile();
  const todayCount = f.date === today ? f.count : 0;
  return res.json({ date: today, today: todayCount, total: f.total, mine: 0, others: todayCount, online: 0, visitorsTotal: f.visitors ?? 0 });
});

app.post("/api/stats/visit", async (req, res) => {
  const today = getWIBDateStr();
  const userId = String(req.body?.userId ?? "").trim().slice(0, 64);
  if (db) {
    try {
      if (userId) {
        await db.insert(userPresenceTable).values({ userId, lastSeen: Date.now() })
          .onConflictDoUpdate({ target: userPresenceTable.userId, set: { lastSeen: Date.now() } });
        const inserted = await db.insert(userVisitDailyTable).values({ userId, date: today })
          .onConflictDoNothing({ target: [userVisitDailyTable.userId, userVisitDailyTable.date] }).returning();
        if (inserted.length > 0) {
          await db.insert(dailyVisitsTable).values({ date: today, count: 1 })
            .onConflictDoUpdate({ target: dailyVisitsTable.date, set: { count: sql`${dailyVisitsTable.count} + 1` } });
          await db.insert(allTimeStatsTable).values({ key: "visitors", value: 1 })
            .onConflictDoUpdate({ target: allTimeStatsTable.key, set: { value: sql`${allTimeStatsTable.value} + 1` } });
        }
      }
      const [visitorsRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "visitors"));
      return res.json({ ok: true, visitorsTotal: visitorsRow?.value ?? 0 });
    } catch (e) { console.error("[db] visit error:", e.message); }
  }
  const f = readFile();
  if (f.visitDate !== today) { f.visitDate = today; f.visitedIds = []; }
  const visited = new Set(f.visitedIds ?? []);
  if (userId && !visited.has(userId)) {
    visited.add(userId);
    f.visitedIds = Array.from(visited);
    f.visitors = (f.visitors ?? 0) + 1;
    writeFile(f);
  }
  return res.json({ ok: true, visitorsTotal: f.visitors ?? 0 });
});

app.post("/api/stats/leave", async (req, res) => {
  const userId = String(req.body?.userId ?? "").trim().slice(0, 64);
  if (db && userId) {
    try { await db.delete(userPresenceTable).where(eq(userPresenceTable.userId, userId)); } catch (e) { console.error("[db] leave error:", e.message); }
  }
  return res.json({ ok: true });
});

app.post("/api/stats/ping", async (req, res) => {
  const today = getWIBDateStr();
  const raw = Number(req.body?.count);
  const amount = Number.isFinite(raw) && raw >= 1 ? Math.min(Math.floor(raw), 1000) : 1;
  const userId = String(req.body?.userId ?? "").trim().slice(0, 64);
  if (db) {
    try {
      await db.insert(dailyStatsTable).values({ date: today, count: amount })
        .onConflictDoUpdate({ target: dailyStatsTable.date, set: { count: sql`${dailyStatsTable.count} + ${amount}` } });
      await db.insert(allTimeStatsTable).values({ key: "total", value: amount })
        .onConflictDoUpdate({ target: allTimeStatsTable.key, set: { value: sql`${allTimeStatsTable.value} + ${amount}` } });
      if (userId) {
        await db.insert(userDailyStatsTable).values({ userId, date: today, count: amount })
          .onConflictDoUpdate({ target: [userDailyStatsTable.userId, userDailyStatsTable.date], set: { count: sql`${userDailyStatsTable.count} + ${amount}` } });
        await db.insert(userPresenceTable).values({ userId, lastSeen: Date.now() })
          .onConflictDoUpdate({ target: userPresenceTable.userId, set: { lastSeen: Date.now() } });
      }
      const [dayRow] = await db.select().from(dailyStatsTable).where(eq(dailyStatsTable.date, today));
      const [totalRow] = await db.select().from(allTimeStatsTable).where(eq(allTimeStatsTable.key, "total"));
      return res.json({ ok: true, date: today, today: dayRow?.count ?? amount, total: totalRow?.value ?? amount });
    } catch (e) { console.error("[db] ping error:", e.message); }
  }
  const f = readFile();
  if (f.date !== today) { f.date = today; f.count = 0; }
  f.count += amount;
  f.total += amount;
  writeFile(f);
  return res.json({ ok: true, date: today, today: f.count, total: f.total });
});

app.post("/api/stats/reset", async (_req, res) => {
  const today = getWIBDateStr();
  if (db) {
    try {
      await db.delete(dailyStatsTable);
      await db.delete(userDailyStatsTable);
      await db.insert(allTimeStatsTable).values({ key: "total", value: 0 })
        .onConflictDoUpdate({ target: allTimeStatsTable.key, set: { value: 0 } });
      return res.json({ ok: true });
    } catch {}
  }
  writeFile({ date: today, count: 0, total: 0 });
  return res.json({ ok: true });
});

export default app;
