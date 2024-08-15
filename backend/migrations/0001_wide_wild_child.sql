ALTER TABLE "meet" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "meet" ADD COLUMN "time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "meet" ADD COLUMN "finalized" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meet" ADD CONSTRAINT "meet_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
