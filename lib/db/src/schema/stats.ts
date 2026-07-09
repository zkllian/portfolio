import { pgTable, text, integer, bigint, primaryKey } from "drizzle-orm/pg-core";

export const dailyStatsTable = pgTable("daily_stats", {
  date: text("date").primaryKey(),
  count: integer("count").notNull().default(0),
});

export const allTimeStatsTable = pgTable("all_time_stats", {
  key: text("key").primaryKey(),
  value: integer("value").notNull().default(0),
});

export const userDailyStatsTable = pgTable("user_daily_stats", {
  userId: text("user_id").notNull(),
  date: text("date").notNull(),
  count: integer("count").notNull().default(0),
}, (t) => [primaryKey({ columns: [t.userId, t.date] })]);

export const userPresenceTable = pgTable("user_presence", {
  userId: text("user_id").primaryKey(),
  lastSeen: bigint("last_seen", { mode: "number" }).notNull(),
});
