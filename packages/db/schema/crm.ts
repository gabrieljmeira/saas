import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  index,
  check
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { profiles } from "./users";
import { leads } from "./leads";
import { opportunities } from "./pipeline";
import { communityPosts } from "./community";

export const followUps = pgTable("follow_ups", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  
  // Exactly one of these should be populated
  opportunityId: uuid("opportunity_id").references(() => opportunities.id, { onDelete: "cascade" }),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "cascade" }),
  
  title: text("title").notNull(),
  notes: text("notes"),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  
  type: text("type").notNull().default("follow_up"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userDueIdx: index("follow_ups_user_due_idx").on(table.userId, table.dueDate),
    opportunityIdx: index("follow_ups_opportunity_idx").on(table.opportunityId),
    leadIdx: index("follow_ups_lead_idx").on(table.leadId),
    // Ensure exactly one relation is set
    entityCheck: check("follow_ups_entity_check", sql`("opportunity_id" IS NULL) != ("lead_id" IS NULL)`)
  };
});

export const messageTemplates = pgTable("message_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  niche: text("niche"),
  channel: text("channel"),
  category: text("category").notNull().default("first_contact"),
  isFavorite: boolean("is_favorite").notNull().default(false),
  communityPostId: uuid("community_post_id").references(() => communityPosts.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userIdx: index("message_templates_user_idx").on(table.userId),
  };
});
