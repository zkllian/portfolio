import { pgTable, text, bigint, primaryKey } from "drizzle-orm/pg-core";

// One row per user per WIB calendar day.
// last_seen is epoch-ms; updated on every heartbeat, nulled on /leave.
export const visits = pgTable(
  "visits",
  {
    userId:    text("user_id").notNull(),
    visitDate: text("visit_date").notNull(), // 'YYYY-MM-DD' in WIB (UTC+7)
    lastSeen:  bigint("last_seen", { mode: "number" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.visitDate] })],
);
