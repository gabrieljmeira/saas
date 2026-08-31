import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { profiles } from "./users";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "PURCHASE",
  "CONSUMPTION",
  "REFUND",
  "BONUS",
  "ADMIN_ADJUSTMENT",
]);

export const searchSourceEnum = pgEnum("search_source", [
  "PLAN",
  "CREDIT",
  "UNLIMITED",
]);

export const searchStatusEnum = pgEnum("search_status", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
]);

export const creditWallet = pgTable(
  "credit_wallet",
  {
    userId: uuid("user_id")
      .primaryKey()
      .references(() => profiles.id, { onDelete: "cascade" }),
    balance: integer("balance").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
);

export const creditTransactions = pgTable(
  "credit_transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    type: transactionTypeEnum("type").notNull(),
    amount: integer("amount").notNull(),
    balanceAfter: integer("balance_after").notNull(),
    referenceId: text("reference_id"), // paddle tx id, search id, etc.
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
);

export const searchUsage = pgTable(
  "search_usage",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    planAtTime: text("plan_at_time").notNull(), // 'FREE', 'FREELANCER', 'AGENCY'
    source: searchSourceEnum("source").notNull(),
    status: searchStatusEnum("status").default("PENDING").notNull(),
    resultsReturned: integer("results_returned").default(0),
    creditTransactionId: uuid("credit_transaction_id").references(
      () => creditTransactions.id,
      { onDelete: "set null" }
    ),
    failureReason: text("failure_reason"),
    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  }
);

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: text("id").primaryKey(), // paddle event id
    type: text("type").notNull(),
    status: text("status").default("processed").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
);
