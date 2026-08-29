"use server";

import { db } from "@saas/db/client";
import { communityPosts, communitySharedTemplates } from "@saas/db/schema";
import { createClient } from "@/lib/supabase/server";
import { CreateManualPostSchema } from "@saas/core";
import { revalidatePath } from "next/cache";

export async function createManualPost(formData: FormData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        error: "UNAUTHORIZED: Você precisa estar logado para publicar.",
      };
    }

    const type = formData.get("type") as string;
    const content = formData.get("content") as string;

    // Parse template data if any
    let templateMetadata = undefined;
    if (type === "template") {
      const templateTitle = formData.get("templateTitle") as string;
      const templateNiche = formData.get("templateNiche") as string;
      const templateChannel = formData.get("templateChannel") as string;

      templateMetadata = {
        title: templateTitle,
        niche: templateNiche || undefined,
        channel: templateChannel || undefined,
      };
    }

    const parsed = CreateManualPostSchema.safeParse({
      type,
      content,
      templateMetadata,
    });

    if (!parsed.success) {
      return {
        error: "INVALID_POST: Dados inválidos.",
        details: parsed.error.flatten(),
      };
    }

    const data = parsed.data;

    // Use transaction if template, to create both Post and SharedTemplate
    if (data.type === "template" && data.templateMetadata) {
      await db.transaction(async (tx) => {
        const [post] = await tx
          .insert(communityPosts)
          .values({
            authorId: user.id,
            type: data.type,
            content: data.content,
            sourceType: "manual",
            isVerified: false,
          })
          .returning({ id: communityPosts.id });

        await tx.insert(communitySharedTemplates).values({
          postId: post.id,
          authorId: user.id,
          title: data.templateMetadata!.title,
          body: data.content, // Body is the content
          niche: data.templateMetadata!.niche,
          channel: data.templateMetadata!.channel,
        });
      });
    } else {
      await db.insert(communityPosts).values({
        authorId: user.id,
        type: data.type,
        content: data.content,
        sourceType: "manual",
        isVerified: false,
      });
    }

    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    console.error("Error creating manual post:", error);
    return { error: "Erro interno ao criar publicação." };
  }
}
