import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  index
} from "drizzle-orm/pg-core";
import { profiles } from "./users";

export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  
  // type: 'leads_found', 'contacts_made', 'follow_ups_done', 'proposals_sent', 'sales_closed', 'revenue'
  type: text("type").notNull(), 
  period: text("period").notNull(), // 'daily', 'weekly', 'monthly'
  
  targetValue: integer("target_value").notNull(),
  
  // Note: currentValue is NOT persisted. It is calculated dynamically based on actual events
  // (leads created, interactions recorded, opportunities won) between startsAt and endsAt.
  
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  
  // Only set when the goal's endsAt has passed and it met the target
  completedAt: timestamp("completed_at", { withTimezone: true }), 
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userPeriodIdx: index("goals_user_period_idx").on(table.userId, table.period, table.startsAt),
  };
});
