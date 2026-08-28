CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"company_name" text,
	"avatar_url" text,
	"monthly_goal_cents" integer,
	"average_ticket_cents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- 1. Constraints for non-negative financial values
ALTER TABLE "public"."profiles" 
  ADD CONSTRAINT "monthly_goal_cents_non_negative" CHECK ("monthly_goal_cents" >= 0),
  ADD CONSTRAINT "average_ticket_cents_non_negative" CHECK ("average_ticket_cents" >= 0);

-- 2. Foreign key to auth.users
ALTER TABLE "public"."profiles" 
  ADD CONSTRAINT "profiles_id_fkey" 
  FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

-- 3. Enable RLS
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- 4. Minimal Permissions
-- Do NOT grant to 'anon'
GRANT SELECT, UPDATE ON "public"."profiles" TO "authenticated";
GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."profiles" TO "service_role";

-- 5. Policies
CREATE POLICY "Users can read own profile" 
  ON "public"."profiles" 
  FOR SELECT 
  TO "authenticated" 
  USING ("id" = (select auth.uid()));

CREATE POLICY "Users can update own profile" 
  ON "public"."profiles" 
  FOR UPDATE 
  TO "authenticated" 
  USING ("id" = (select auth.uid()));

-- 6. Trigger for updated_at
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  NEW."updated_at" = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER "set_public_profiles_updated_at"
  BEFORE UPDATE ON "public"."profiles"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."set_current_timestamp_updated_at"();

-- 7. Function and Trigger for new user handling
CREATE OR REPLACE FUNCTION "public"."handle_new_user"() 
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO "public"."profiles" ("id", "name", "avatar_url")
  VALUES (
    NEW."id",
    NEW."raw_user_meta_data"->>'name',
    NEW."raw_user_meta_data"->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER "on_auth_user_created"
  AFTER INSERT ON "auth"."users"
  FOR EACH ROW 
  EXECUTE FUNCTION "public"."handle_new_user"();

-- 8. Backfill existing users (if any)
INSERT INTO "public"."profiles" ("id", "name", "avatar_url")
SELECT 
  "id",
  "raw_user_meta_data"->>'name',
  "raw_user_meta_data"->>'avatar_url'
FROM "auth"."users"
ON CONFLICT ("id") DO NOTHING;
