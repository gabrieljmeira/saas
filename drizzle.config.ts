import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente (como a DATABASE_URL)
dotenv.config();

export default defineConfig({
  schema: "./packages/db/schema/*",
  out: "./packages/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
