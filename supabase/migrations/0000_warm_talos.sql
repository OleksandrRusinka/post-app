-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text NOT NULL,
	"body" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "UPDATE" ON "posts" AS PERMISSIVE FOR UPDATE TO public USING (true);--> statement-breakpoint
CREATE POLICY "READ" ON "posts" AS PERMISSIVE FOR SELECT TO public;--> statement-breakpoint
CREATE POLICY "INSERT" ON "posts" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "DELETE" ON "posts" AS PERMISSIVE FOR DELETE TO public;
*/