import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";

config();

const run = async () => {
  try {
    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(sql);

    await db
      .update(profiles)
      .set({ role: "OWNER", username: "fetchleads" })
      .where(eq(profiles.id, "50ab8de0-e927-4ea5-b82d-3a9e10ddbcb8"));
    console.log("Updated to OWNER");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
run();
