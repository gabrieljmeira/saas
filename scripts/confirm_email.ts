import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

config();

const run = async () => {
  try {
    const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
    // Drizzle can't easily query auth.users without schema definitions, so we use raw SQL

    await sql`UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'fetchleadss@gmail.com'`;
    console.log("Email manually confirmed!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
run();
