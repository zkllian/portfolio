import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const dailyStatsTable = pgTable("daily_stats", {
  date: text("date").primaryKey(),
  count: integer("count").notNull().default(0),
});
