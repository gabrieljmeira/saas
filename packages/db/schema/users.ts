import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["USER", "STAFF", "OWNER"]);

export const profiles = pgTable("profiles", {
  // O ID é o UUID gerado pelo Supabase Auth. A FK para auth.users será criada na migration SQL.
  id: uuid("id").primaryKey(),
  name: text("name"),
  companyName: text("company_name"),
  avatarUrl: text("avatar_url"),

  // Permission Role
  role: userRoleEnum("role").default("USER").notNull(),

  // Valores financeiros devem ser armazenados em centavos (constraints na migration)
  monthlyGoalCents: integer("monthly_goal_cents"),
  averageTicketCents: integer("average_ticket_cents"),

  // Campos da Comunidade
  username: text("username").unique(),
  bio: text("bio"),
  level: integer("level").default(1).notNull(),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
