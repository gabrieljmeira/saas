CREATE TYPE "public"."user_role" AS ENUM('USER', 'STAFF', 'OWNER');--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "role" "user_role" DEFAULT 'USER' NOT NULL;