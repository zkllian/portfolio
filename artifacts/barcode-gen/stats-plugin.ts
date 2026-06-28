import type { Plugin } from "vite";
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

export function statsPlugin(): Plugin {
  return {
    name: "stats-plugin",
    configureServer(server) {
      server.middlewares.use("/api/stats/today", (_req, res) => {
        const today = getWIBDateStr();
        const stats = readStats();
        const count = stats.date === today ? stats.count : 0;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ date: today, count }));
      });

      server.middlewares.use("/api/stats/ping", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body || "{}") as { count?: number };
            const amount = Number(parsed.count) || 1;
            const today = getWIBDateStr();
            const stats = readStats();
            if (stats.date !== today) { stats.date = today; stats.count = 0; }
            stats.count += amount;
            writeStats(stats);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, date: stats.date, count: stats.count }));
          } catch {
            res.statusCode = 400;
            res.end();
          }
        });
      });
    },
  };
}
