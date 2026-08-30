import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

async function testWrongPassword() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { error } = await supabase.auth.signInWithPassword({
    email: "fetchleadss@gmail.com",
    password: "password123!", // Lowercase p
  });

  console.log("Error object:", JSON.stringify(error, null, 2));
  console.log("Error message:", error?.message);
}

testWrongPassword();
