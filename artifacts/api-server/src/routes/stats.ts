import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";

const STATS_FILE = path.resolve(process.cwd(), "stats.json");

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function readStats(): { date: string; count: number } {
  try {
    if (!fs.existsSync(STATS_FILE)) return { date: getWIBDateStr(), count: 0 };
    return JSON.parse(fs.readFileSync(STATS_FILE, "utf-8"));
  } catch {
    return { date: getWIBDateStr(), count: 0 };
  }
}

function writeStats(data: { date: string; count: number }) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(data), "utf-8");
  } catch {}
}

const router: IRouter = Router();

router.post("/stats/ping", (req, res) => {
  const today = getWIBDateStr();
  const stats = readStats();
  if (stats.date !== today) { stats.date = today; stats.count = 0; }
  const amount = Number((req.body as { count?: number })?.count) || 1;
  stats.count += amount;
  writeStats(stats);
  res.json({ ok: true, date: stats.date, count: stats.count });
});

router.get("/stats/today", (_req, res) => {
  const today = getWIBDateStr();
  const stats = readStats();
  res.json({ date: today, count: stats.date === today ? stats.count : 0 });
});

export default router;
