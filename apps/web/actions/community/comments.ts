"use server";

import { db } from "@saas/db/client";
import { communityComments } from "@saas/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createComment(postId: string, content: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "UNAUTHORIZED" };

    const parsed = z.string().min(1).max(1000).safeParse(content);
    if (!parsed.success) return { error: "Conteúdo inválido." };

    await db.insert(communityComments).values({
      postId,
      authorId: user.id,
      content: parsed.data,
    });

    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao criar comentário." };
  }
}

export async function deleteComment(commentId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "UNAUTHORIZED" };

    const result = await db.delete(communityComments).where(
      and(eq(communityComments.id, commentId), eq(communityComments.authorId, user.id))
    ).returning({ id: communityComments.id });

    if (result.length === 0) {
      return { error: "Comentário não encontrado ou você não tem permissão." };
    }

    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir comentário." };
  }
}
