import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["USER", "STAFF", "OWNER"]);
export const planEnum = pgEnum("plan", ["FREE", "FREELANCER", "AGENCY"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "past_due", "canceled", "trialing", "paused"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  companyName: text("company_name"),
  avatarUrl: text("avatar_url"),

  // Permission Role
  role: userRoleEnum("role").default("USER").notNull(),

  // Plan & Billing
  plan: planEnum("plan").default("FREE").notNull(),
  paddleCustomerId: text("paddle_customer_id"),
  paddleSubscriptionId: text("paddle_subscription_id"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status"),
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),

  // Valores financeiros devem ser armazenados em centavos
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