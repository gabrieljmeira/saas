import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

async function testLogin() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: "fetchleadss@gmail.com",
    password: "Password123!",
  });

  if (error) {
    console.error("Login Error:", error.message, error.name, error.status);
  } else {
    console.log("Login Success! User ID:", data.user?.id);
  }
}

testLogin();
