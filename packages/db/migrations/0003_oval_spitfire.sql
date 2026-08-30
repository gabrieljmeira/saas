CREATE TYPE "public"."opportunity_status" AS ENUM('new', 'qualified', 'contacted', 'replied', 'proposal', 'won', 'lost');--> statement-breakpoint
CREATE TABLE "follow_ups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"opportunity_id" uuid,
	"lead_id" uuid,
	"title" text NOT NULL,
	"notes" text,
	"due_date" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"type" text DEFAULT 'follow_up' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "follow_ups_entity_check" CHECK (("opportunity_id" IS NULL) != ("lead_id" IS NULL))
);
--> statement-breakpoint
CREATE TABLE "message_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"niche" text,
	"channel" text,
	"category" text DEFAULT 'first_contact' NOT NULL,
	"is_favorite" boolean DEFAULT false NOT NULL,
	"community_post_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"period" text NOT NULL,
	"target_value" integer NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"niche" text,
	"city" text,
	"state" text,
	"phone" text,
	"normalized_phone" text,
	"website" text,
	"normalized_domain" text,
	"instagram" text,
	"has_whatsapp" boolean DEFAULT false,
	"source_provider" text DEFAULT 'manual' NOT NULL,
	"provider_id" text,
	"rating" real,
	"review_count" integer,
	"lead_score" integer,
	"lead_score_reasons" jsonb,
	"score_version" integer DEFAULT 1,
	"score_calculated_at" timestamp with time zone,
	"status" text DEFAULT 'new' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"channel" text,
	"notes" text,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"lead_id" uuid NOT NULL,
	"status" "opportunity_status" DEFAULT 'new' NOT NULL,
	"expected_value_cents" integer,
	"actual_value_cents" integer,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"closed_at" timestamp with time zone,
	"lost_reason" text
);
--> statement-breakpoint
ALTER TABLE "follow_ups" ADD CONSTRAINT "follow_ups_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_ups" ADD CONSTRAINT "follow_ups_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_ups" ADD CONSTRAINT "follow_ups_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_community_post_id_community_posts_id_fk" FOREIGN KEY ("community_post_id") REFERENCES "public"."community_posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "public"."opportunities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "follow_ups_user_due_idx" ON "follow_ups" USING btree ("user_id","due_date");--> statement-breakpoint
CREATE INDEX "follow_ups_opportunity_idx" ON "follow_ups" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "follow_ups_lead_idx" ON "follow_ups" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "message_templates_user_idx" ON "message_templates" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "goals_user_period_idx" ON "goals" USING btree ("user_id","period","starts_at");--> statement-breakpoint
CREATE INDEX "leads_user_idx" ON "leads" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "leads_provider_idx" ON "leads" USING btree ("user_id","source_provider","provider_id") WHERE "provider_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "leads_domain_idx" ON "leads" USING btree ("user_id","normalized_domain") WHERE "normalized_domain" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "leads_score_idx" ON "leads" USING btree ("user_id","lead_score");--> statement-breakpoint
CREATE INDEX "interactions_opportunity_idx" ON "interactions" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "interactions_user_idx" ON "interactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "interactions_occurred_at_idx" ON "interactions" USING btree ("user_id","occurred_at");--> statement-breakpoint
CREATE INDEX "opportunities_user_idx" ON "opportunities" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "opportunities_user_status_idx" ON "opportunities" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "opportunities_lead_idx" ON "opportunities" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "opportunities_closed_at_idx" ON "opportunities" USING btree ("closed_at");