import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profiles } from "./users";
import { leads } from "./leads";

export const opportunityStatusEnum = pgEnum("opportunity_status", ["new", "qualified", "contacted", "replied", "proposal", "won", "lost"]);

export const opportunities = pgTable("opportunities", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  leadId: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  
  status: opportunityStatusEnum("status").notNull().default("new"),
  
  // Financial values
  expectedValueCents: integer("expected_value_cents"), // Pipeline potential
  actualValueCents: integer("actual_value_cents"),     // Real revenue when WON
  
  notes: text("notes"),
  
  // Lifecycle timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  closedAt: timestamp("closed_at", { withTimezone: true }), // Unified close timestamp (won or lost)
  
  // Loss metadata
  lostReason: text("lost_reason"), 
}, (table) => {
  return {
    userIdx: index("opportunities_user_idx").on(table.userId),
    userStatusIdx: index("opportunities_user_status_idx").on(table.userId, table.status),
    leadIdx: index("opportunities_lead_idx").on(table.leadId),
    closedAtIdx: index("opportunities_closed_at_idx").on(table.closedAt), // Useful for financial reports
  };
});

// Append-only ledger of all activities
export const interactions = pgTable("interactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  opportunityId: uuid("opportunity_id").notNull().references(() => opportunities.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  
  type: text("type").notNull(), // 'whatsapp', 'call', 'email', 'meeting', 'note', 'status_change'
  channel: text("channel"), // If applicable
  notes: text("notes"),
  
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(), // When the interaction actually happened
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), // When it was recorded in DB
}, (table) => {
  return {
    opportunityIdx: index("interactions_opportunity_idx").on(table.opportunityId),
    userIdx: index("interactions_user_idx").on(table.userId),
    occurredAtIdx: index("interactions_occurred_at_idx").on(table.userId, table.occurredAt),
  };
});

export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  lead: one(leads, {
    fields: [opportunities.leadId],
    references: [leads.id]
  }),
  profile: one(profiles, {
    fields: [opportunities.userId],
    references: [profiles.id]
  }),
  interactions: many(interactions)
}));

export const interactionsRelations = relations(interactions, ({ one }) => ({
  opportunity: one(opportunities, {
    fields: [interactions.opportunityId],
    references: [opportunities.id]
  }),
  profile: one(profiles, {
    fields: [interactions.userId],
    references: [profiles.id]
  })
}));
