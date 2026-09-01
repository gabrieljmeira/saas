"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { leads, opportunities, interactions } from "@saas/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  calculateLeadScore,
  DiscoveredLead,
  ApproachContext,
  DefaultApproachGenerator,
} from "@saas/core";

export async function saveDiscoveredLeadAction(
  leadData: DiscoveredLead,
  sourceProvider: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const scoreResult = calculateLeadScore({
    website: leadData.website,
    hasWhatsapp: leadData.hasWhatsapp,
    instagram: leadData.instagram,
    rating: leadData.rating,
    reviewCount: leadData.reviewCount,
    status: "new",
  });

  try {
    const existing = await db.query.leads.findFirst({
      where: and(
        eq(leads.userId, user.id),
        eq(leads.sourceProvider, sourceProvider),
        eq(leads.providerId, leadData.providerId),
      ),
    });

    if (existing) {
      return { success: true, leadId: existing.id, isNew: false };
    }

    const inserted = await db
      .insert(leads)
      .values({
        userId: user.id,
        name: leadData.name,
        niche: leadData.niche,
        city: leadData.city,
        state: leadData.state,
        phone: leadData.phone,
        normalizedPhone: leadData.normalizedPhone,
        website: leadData.website,
        normalizedDomain: leadData.normalizedDomain,
        instagram: leadData.instagram,
        hasWhatsapp: leadData.hasWhatsapp ?? false,
        sourceProvider: sourceProvider,
        providerId: leadData.providerId,
        rating: leadData.rating,
        reviewCount: leadData.reviewCount,
        leadScore: scoreResult.score,
        leadScoreReasons: scoreResult.reasons,
        scoreVersion: scoreResult.version,
        scoreCalculatedAt: new Date(),
        status: "new",
      })
      .returning({ id: leads.id });

    revalidatePath("/leads");
    return { success: true, leadId: inserted[0].id, isNew: true };
  } catch (error: unknown) {
    console.error("Error saving lead:", error);
    const err = error as { code?: string };
    if (err.code === "23505") {
      return { success: false, error: "Lead já existe na sua base." };
    }
    return { success: false, error: "Falha ao salvar lead." };
  }
}

// Mass assignment protected update
export async function updateLeadSafeAction(
  leadId: string,
  updates: { status?: string; notes?: string },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const safePayload: Record<string, unknown> = { updatedAt: new Date() };
  if (updates.status) safePayload.status = updates.status;
  if (updates.notes !== undefined) safePayload.notes = updates.notes;

  if (Object.keys(safePayload).length <= 1) return { success: true };

  await db
    .update(leads)
    .set(safePayload)
    .where(and(eq(leads.id, leadId), eq(leads.userId, user.id)));

  revalidatePath("/leads");
  return { success: true };
}

export async function createOpportunityFromLeadAction(leadId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Verify lead exists and belongs to user
  const lead = await db.query.leads.findFirst({
    where: and(eq(leads.id, leadId), eq(leads.userId, user.id)),
  });

  if (!lead) throw new Error("Lead not found");

  // Idempotency: check if an open opportunity already exists for this lead
  const existingOpp = await db.query.opportunities.findFirst({
    where: and(
      eq(opportunities.leadId, lead.id),
      eq(opportunities.userId, user.id),
    ),
  });

  // If already exists and is not closed/lost, just return it
  if (
    existingOpp &&
    existingOpp.status !== "won" &&
    existingOpp.status !== "lost"
  ) {
    return { success: true, opportunityId: existingOpp.id, isNew: false };
  }

  // Create new opportunity
  const inserted = await db
    .insert(opportunities)
    .values({
      userId: user.id,
      leadId: lead.id,
      status: "new",
    })
    .returning({ id: opportunities.id });

  // Update lead status if it was new
  if (lead.status === "new") {
    await db
      .update(leads)
      .set({ status: "in_pipeline", updatedAt: new Date() })
      .where(eq(leads.id, lead.id));
  }

  revalidatePath("/leads");
  revalidatePath("/pipeline");

  return { success: true, opportunityId: inserted[0].id, isNew: true };
}

export async function logInteractionAction(
  leadId: string,
  type: "WHATSAPP_OPENED" | "CONTACTED",
  channel: string = "whatsapp",
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  let oppId: string | undefined = undefined;

  // Always ensure opportunity exists when logging any interaction on a lead
  const oppRes = await createOpportunityFromLeadAction(leadId);
  oppId = oppRes.opportunityId;

  if (oppId) {
    await db.insert(interactions).values({
      userId: user.id,
      opportunityId: oppId,
      type: type,
      channel: channel,
      occurredAt: new Date(),
    });
  }

  revalidatePath("/leads");
  if (oppId) revalidatePath("/pipeline");

  return { success: true };
}

export async function generateApproachAction(leadId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const lead = await db.query.leads.findFirst({
    where: and(eq(leads.id, leadId), eq(leads.userId, user.id)),
  });

  if (!lead) throw new Error("Lead not found");

  const generator = new DefaultApproachGenerator();

  const ctx: ApproachContext = {
    name: lead.name,
    niche: lead.niche,
    city: lead.city,
    website: lead.website,
    scoreReasons: Array.isArray(lead.leadScoreReasons)
      ? (lead.leadScoreReasons as unknown as { label: string }[])
      : [],
  };

  const res = await generator.generate(ctx);

  return res;
}
import { profiles } from "@saas/db/schema/users";
import { consumeSearch, completeSearch, refundSearch } from "@saas/core";
import { PlanType } from "@saas/core";

export async function startSearchAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });
  if (!profile) throw new Error("Profile not found");

  const result = await consumeSearch(user.id, profile.plan as PlanType);
  if (!result.allowed) return { success: false, error: "QUOTA_EXCEEDED" };

  return { success: true, usageId: result.usageId };
}

export async function completeSearchAction(
  usageId: string,
  resultsReturned: number,
) {
  await completeSearch(usageId, resultsReturned);
}

export async function failSearchAction(usageId: string, reason: string) {
  await refundSearch(usageId, reason);
}
