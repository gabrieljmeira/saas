import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

async function run() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { data, error } = await supabase.auth.signUp({
    email: "FetchLeadss@gmail.com",
    password: "Password123!",
    options: {
      data: { name: "FetchLeads Admin" },
    },
  });

  if (error) {
    console.error("Error creating user:", error);
  } else {
    console.log("User created:", data.user?.email);
  }
}

run();
