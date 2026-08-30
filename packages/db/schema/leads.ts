import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  real,
  jsonb,
  index,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { profiles } from "./users";

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  
  // Basic Info
  name: text("name").notNull(),
  niche: text("niche"),
  city: text("city"),
  state: text("state"),
  
  // Contact & Social
  phone: text("phone"),
  normalizedPhone: text("normalized_phone"), // For deduplication
  website: text("website"),
  normalizedDomain: text("normalized_domain"), // For deduplication
  instagram: text("instagram"),
  hasWhatsapp: boolean("has_whatsapp").default(false),
  
  // Discovery & Provider
  sourceProvider: text("source_provider").notNull().default("manual"), // 'google_maps', 'manual', etc
  providerId: text("provider_id"), // Original ID from provider
  
  // Ratings (if from Maps/Yelp)
  rating: real("rating"),
  reviewCount: integer("review_count"),
  
  // Scoring (Server-controlled)
  leadScore: integer("lead_score"),
  leadScoreReasons: jsonb("lead_score_reasons"),
  scoreVersion: integer("score_version").default(1),
  scoreCalculatedAt: timestamp("score_calculated_at", { withTimezone: true }),
  
  // State
  status: text("status").notNull().default("new"), // 'new', 'contacted', 'qualified', 'archived', 'in_pipeline'
  notes: text("notes"),
  
  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userIdx: index("leads_user_idx").on(table.userId),
    statusIdx: index("leads_status_idx").on(table.userId, table.status),
    
    // Deduplication via provider ID
    providerIdx: uniqueIndex("leads_provider_idx")
      .on(table.userId, table.sourceProvider, table.providerId)
      .where(sql`"provider_id" IS NOT NULL`),
      
    // Deduplication via domain
    domainIdx: uniqueIndex("leads_domain_idx")
      .on(table.userId, table.normalizedDomain)
      .where(sql`"normalized_domain" IS NOT NULL`),
      
    scoreIdx: index("leads_score_idx").on(table.userId, table.leadScore),
  };
});

export const leadsRelations = relations(leads, ({ one }) => ({
  profile: one(profiles, {
    fields: [leads.userId],
    references: [profiles.id],
  }),
}));
