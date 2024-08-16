CREATE TABLE IF NOT EXISTS "vote" (
	"created_by" integer NOT NULL,
	"location_id" integer NOT NULL,
	"meet_id" integer NOT NULL,
	CONSTRAINT "vote_created_by_location_id_meet_id_pk" PRIMARY KEY("created_by","location_id","meet_id")
);
--> statement-breakpoint
ALTER TABLE "meet" ALTER COLUMN "created_by" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meet" ALTER COLUMN "finalized" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_meet_id_meet_id_fk" FOREIGN KEY ("meet_id") REFERENCES "public"."meet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
