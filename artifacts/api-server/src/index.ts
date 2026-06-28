import app from "./app";
import { logger } from "./lib/logger";
import { createDb } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function migrate() {
  const db = createDb();
  if (!db) return;
  try {
    await db.execute(
      `CREATE TABLE IF NOT EXISTS daily_stats (
        date TEXT PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      )`
    );
    logger.info("DB migration OK");
  } catch (err) {
    logger.warn({ err }, "DB migration failed — continuing anyway");
  }
}

migrate().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
});
