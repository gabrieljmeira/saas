import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@supabase/supabase-js";

config();

const run = async () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // Using a service role key if we had one, but we don't.
    // Instead we can just find the user in auth.users? We can't query auth.users from Drizzle unless we have access.
    // Let's just update all profiles where we know the name or just set everyone to OWNER for testing? NO!
    // Wait, let's just fetch all profiles and log them.

    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(sql);

    const allProfiles = await db.select().from(profiles);
    console.log("Profiles in DB:", allProfiles);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
run();
