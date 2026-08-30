"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { leads } from "@saas/db/schema";
import { and, eq } from "drizzle-orm";

export async function getLeadDetailsAction(leadId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const lead = await db.query.leads.findFirst({
    where: and(
      eq(leads.id, leadId),
      eq(leads.userId, user.id) // Security: ensures user can only access their own leads (IDOR prevention)
    )
  });

  if (!lead) throw new Error("Lead not found");

  return lead;
}
