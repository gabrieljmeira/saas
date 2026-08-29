import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "dotenv";

config();

const run = async () => {
  try {
    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(sql);
    await migrate(db, { migrationsFolder: "./packages/db/migrations" });
    console.log("Migration successful!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};
run();
