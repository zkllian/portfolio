import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../../data");
const STATS_FILE = path.join(DATA_DIR, "stats.json");

function getWIBDateStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Jakarta" });
}

function readStats(): { date: string; count: number } {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(STATS_FILE)) return { date: getWIBDateStr(), count: 0 };
    const raw = fs.readFileSync(STATS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { date: getWIBDateStr(), count: 0 };
  }
}

function writeStats(data: { date: string; count: number }) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(STATS_FILE, JSON.stringify(data), "utf-8");
  } catch {}
}

const router: IRouter = Router();

router.post("/stats/ping", (req, res) => {
  const today = getWIBDateStr();
  const stats = readStats();
  if (stats.date !== today) {
    stats.date = today;
    stats.count = 0;
  }
  const amount = Number((req.body as { count?: number })?.count) || 1;
  stats.count += amount;
  writeStats(stats);
  res.json({ ok: true, date: stats.date, count: stats.count });
});

router.get("/stats/today", (_req, res) => {
  const today = getWIBDateStr();
  const stats = readStats();
  if (stats.date !== today) {
    res.json({ date: today, count: 0 });
  } else {
    res.json({ date: stats.date, count: stats.count });
  }
});

export default router;
