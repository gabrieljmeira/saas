"use server";

import { db } from "@saas/db/client";
import {
  communityLikes,
  communitySavedPosts,
  communityFollows,
  communityPosts,
} from "@saas/db/schema";
import { createClient } from "@/lib/supabase/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function toggleLike(postId: string) {
  try {
    const user = await getUser();
    // Verify if already liked
    const existing = await db.query.communityLikes.findFirst({
      where: and(
        eq(communityLikes.userId, user.id),
        eq(communityLikes.postId, postId),
      ),
    });

    if (existing) {
      await db
        .delete(communityLikes)
        .where(
          and(
            eq(communityLikes.userId, user.id),
            eq(communityLikes.postId, postId),
          ),
        );
    } else {
      await db
        .insert(communityLikes)
        .values({ userId: user.id, postId })
        .onConflictDoNothing();
    }
    revalidatePath("/community");
    return { success: true, liked: !existing };
  } catch (error) {
    return { error: "Erro ao processar curtida." };
  }
}

export async function toggleSave(postId: string) {
  try {
    const user = await getUser();
    const existing = await db.query.communitySavedPosts.findFirst({
      where: and(
        eq(communitySavedPosts.userId, user.id),
        eq(communitySavedPosts.postId, postId),
      ),
    });

    if (existing) {
      await db
        .delete(communitySavedPosts)
        .where(
          and(
            eq(communitySavedPosts.userId, user.id),
            eq(communitySavedPosts.postId, postId),
          ),
        );
    } else {
      await db
        .insert(communitySavedPosts)
        .values({ userId: user.id, postId })
        .onConflictDoNothing();
    }
    revalidatePath("/community");
    return { success: true, saved: !existing };
  } catch (error) {
    return { error: "Erro ao salvar publicação." };
  }
}

export async function toggleFollow(followedId: string) {
  try {
    const user = await getUser();
    if (user.id === followedId) {
      return { error: "Não é possível seguir a si mesmo." };
    }

    const existing = await db.query.communityFollows.findFirst({
      where: and(
        eq(communityFollows.followerId, user.id),
        eq(communityFollows.followedId, followedId),
      ),
    });

    if (existing) {
      await db
        .delete(communityFollows)
        .where(
          and(
            eq(communityFollows.followerId, user.id),
            eq(communityFollows.followedId, followedId),
          ),
        );
    } else {
      await db
        .insert(communityFollows)
        .values({ followerId: user.id, followedId })
        .onConflictDoNothing();
    }
    revalidatePath("/community");
    return { success: true, following: !existing };
  } catch (error) {
    return { error: "Erro ao processar seguidor." };
  }
}

export async function deletePost(postId: string) {
  try {
    const user = await getUser();

    // Explicit ownership check
    const result = await db
      .delete(communityPosts)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.authorId, user.id),
        ),
      )
      .returning({ id: communityPosts.id });

    if (result.length === 0) {
      return {
        error:
          "Publicação não encontrada ou você não tem permissão para excluí-la.",
      };
    }

    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir publicação." };
  }
}
