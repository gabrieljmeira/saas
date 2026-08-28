import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

// 1. Tabela users: Perfil interno ligado ao provider de autenticação
export const users = pgTable("users", {
  // O ID será o mesmo UUID gerado pelo Supabase Auth
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Tabela profiles: Campos exatos solicitados no MVP
export const profiles = pgTable("profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  companyName: text("company_name"),
  avatarUrl: text("avatar_url"),

  // Metas Financeiras do Onboarding
  monthlyGoal: integer("monthly_goal"),
  averageTicket: integer("average_ticket"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
