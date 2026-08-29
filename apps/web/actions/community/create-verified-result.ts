"use server";

import { db } from "@saas/db/client";
import { communityPosts } from "@saas/db/schema";
import { createClient } from "@/lib/supabase/server";
import { CreateVerifiedResultSchema, crmAdapter, anonymizeLeadName } from "@saas/core";
import { revalidatePath } from "next/cache";

export async function createVerifiedResult(opportunityId: string, consent: boolean) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: "UNAUTHORIZED: Você precisa estar logado." };
    }

    const parsed = CreateVerifiedResultSchema.safeParse({ opportunityId, consent });
    if (!parsed.success) {
      return { error: "CONSENT_REQUIRED: O consentimento é obrigatório.", details: parsed.error.flatten() };
    }

    // 1. Fetch from mock/adapter CRM
    const opportunity = await crmAdapter.getWonOpportunity(opportunityId, user.id);
    if (!opportunity) {
      return { error: "OPPORTUNITY_NOT_WON: Oportunidade não encontrada ou não ganha." };
    }

    // 2. Anonymize the data (Server-side privacy check)
    const safeTitle = anonymizeLeadName(opportunity.leadName, opportunity.city);
    const content = `Fechei um negócio: ${safeTitle}`;

    // 3. Build Safe Metadata
    const metadata = {
      amountCents: opportunity.revenueCents,
      niche: opportunity.niche,
      city: opportunity.city || undefined,
      leadScore: opportunity.leadScore || undefined,
      closeDays: opportunity.daysToClose,
      channel: opportunity.channel,
    };

    // 4. Save to DB with `isVerified = true`
    await db.insert(communityPosts).values({
      authorId: user.id,
      type: "result",
      content,
      metadata,
      sourceType: "crm_opportunity",
      sourceId: opportunity.id, // Will prevent duplicates via unique index
      isVerified: true,
    });

    revalidatePath("/community");
    return { success: true };

  } catch (error: any) {
    if (error?.message?.includes("community_posts_source_idx")) {
      return { error: "DUPLICATE: Esta oportunidade já foi compartilhada na comunidade." };
    }
    if (error?.message?.includes("SOURCE_NOT_AVAILABLE")) {
      return { error: error.message };
    }
    console.error("Error creating verified result:", error);
    return { error: "Erro interno ao processar publicação." };
  }
}
