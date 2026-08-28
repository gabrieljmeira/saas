import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  // O ID é o UUID gerado pelo Supabase Auth. A FK para auth.users será criada na migration SQL.
  id: uuid("id").primaryKey(),
  name: text("name"),
  companyName: text("company_name"),
  avatarUrl: text("avatar_url"),

  // Valores financeiros devem ser armazenados em centavos (constraints na migration)
  monthlyGoalCents: integer("monthly_goal_cents"),
  averageTicketCents: integer("average_ticket_cents"),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
