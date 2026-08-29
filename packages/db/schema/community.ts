import { pgTable, text, timestamp, uuid, boolean, jsonb, uniqueIndex, index, primaryKey } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { profiles } from "./users";

export const communityPosts = pgTable("community_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // result, achievement, strategy, question, template, weekly_result
  content: text("content"),
  metadata: jsonb("metadata"), // specific metadata per type
  sourceType: text("source_type").notNull(), // manual, crm_opportunity, gamification_achievement, weekly_metrics
  sourceId: text("source_id"), // if any, for duplicate prevention
  isVerified: boolean("is_verified").notNull().default(false),
  visibility: text("visibility").notNull().default("public"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    createdAtIdx: index("community_posts_created_at_idx").on(table.createdAt),
    authorIdx: index("community_posts_author_idx").on(table.authorId),
    sourceIdx: uniqueIndex("community_posts_source_idx")
      .on(table.sourceType, table.sourceId)
      .where(sql`${table.sourceId} IS NOT NULL`), // Prevent duplicating the same CRM/Gamification event
  };
});

export const communityLikes = pgTable("community_likes", {
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  postId: uuid("post_id").notNull().references(() => communityPosts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.postId] }),
    postIdx: index("community_likes_post_idx").on(table.postId),
  };
});

export const communityComments = pgTable("community_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").notNull().references(() => communityPosts.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    postIdx: index("community_comments_post_idx").on(table.postId),
  };
});

export const communityFollows = pgTable("community_follows", {
  followerId: uuid("follower_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  followedId: uuid("followed_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.followerId, table.followedId] }),
    followerIdx: index("community_follows_follower_idx").on(table.followerId),
  };
});

export const communitySavedPosts = pgTable("community_saved_posts", {
  userId: uuid("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  postId: uuid("post_id").notNull().references(() => communityPosts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.postId] }),
    userIdx: index("community_saved_posts_user_idx").on(table.userId),
  };
});

export const communitySharedTemplates = pgTable("community_shared_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").notNull().references(() => communityPosts.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  niche: text("niche"),
  channel: text("channel"), // whatsapp, email, etc.
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const communityPostsRelations = relations(communityPosts, ({ one, many }) => ({
  author: one(profiles, {
    fields: [communityPosts.authorId],
    references: [profiles.id],
  }),
  likes: many(communityLikes),
  comments: many(communityComments),
  saves: many(communitySavedPosts),
  sharedTemplate: one(communitySharedTemplates, {
    fields: [communityPosts.id],
    references: [communitySharedTemplates.postId],
  }),
}));

export const profilesCommunityRelations = relations(profiles, ({ many }) => ({
  posts: many(communityPosts),
  followers: many(communityFollows, { relationName: "following" }),
  following: many(communityFollows, { relationName: "followers" }),
}));
