"use server";

import { db } from "@saas/db/client";
import { communityPosts, communityFollows } from "@saas/db/schema";
import { createClient } from "@/lib/supabase/server";
import { desc, lt, and, or, eq, sql } from "drizzle-orm";

export async function getFeed(params: {
  tab: "community" | "following";
  cursor?: { createdAt: Date; id: string };
  limit?: number;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id || null;

  const limit = params.limit || 20;

  // Build the where clause
  const conditions = [];

  // 1. Tab filtering
  if (params.tab === "following") {
    if (!userId) throw new Error("UNAUTHORIZED");
    // Only posts from followed users
    conditions.push(
      sql`${communityPosts.authorId} IN (SELECT followed_id FROM community_follows WHERE follower_id = ${userId})`,
    );
  }

  // 2. Cursor pagination (createdAt + id)
  if (params.cursor) {
    conditions.push(
      or(
        lt(communityPosts.createdAt, params.cursor.createdAt),
        and(
          eq(communityPosts.createdAt, params.cursor.createdAt),
          lt(communityPosts.id, params.cursor.id),
        ),
      ),
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const posts = await db.query.communityPosts.findMany({
    where: whereClause,
    orderBy: [desc(communityPosts.createdAt), desc(communityPosts.id)],
    limit: limit + 1, // Fetch +1 to determine hasNextPage
    with: {
      author: true,
      sharedTemplate: true,
    },
    extras: (post, { sql }) => ({
      likeCount:
        sql<number>`CAST((SELECT COUNT(*) FROM community_likes WHERE post_id = ${post.id}) AS INTEGER)`.as(
          "likeCount",
        ),
      commentCount:
        sql<number>`CAST((SELECT COUNT(*) FROM community_comments WHERE post_id = ${post.id}) AS INTEGER)`.as(
          "commentCount",
        ),
      likedByMe: userId
        ? sql<boolean>`EXISTS(SELECT 1 FROM community_likes WHERE post_id = ${post.id} AND user_id = ${userId})`.as(
            "likedByMe",
          )
        : sql<boolean>`false`.as("likedByMe"),
      savedByMe: userId
        ? sql<boolean>`EXISTS(SELECT 1 FROM community_saved_posts WHERE post_id = ${post.id} AND user_id = ${userId})`.as(
            "savedByMe",
          )
        : sql<boolean>`false`.as("savedByMe"),
      followingAuthor: userId
        ? sql<boolean>`EXISTS(SELECT 1 FROM community_follows WHERE followed_id = ${post.authorId} AND follower_id = ${userId})`.as(
            "followingAuthor",
          )
        : sql<boolean>`false`.as("followingAuthor"),
    }),
  });

  const hasNextPage = posts.length > limit;
  const rawItems = hasNextPage ? posts.slice(0, -1) : posts;

  // Anonymize server-side
  const items = rawItems.map((post) => {
    const isOfficial =
      post.author?.role === "STAFF" || post.author?.role === "OWNER";
    return {
      ...post,
      author: isOfficial
        ? post.author
        : {
            ...post.author,
            name: `Membro ${post.authorId.substring(0, 4).toUpperCase()}`,
            username: `membro_${post.authorId.substring(0, 4)}`,
          },
    };
  });

  const nextCursor =
    items.length > 0
      ? {
          createdAt: items[items.length - 1].createdAt!,
          id: items[items.length - 1].id,
        }
      : undefined;

  return {
    items,
    nextCursor,
    hasNextPage,
  };
}
