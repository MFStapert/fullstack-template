ALTER TABLE "vote" DROP CONSTRAINT "vote_created_by_location_id_meet_id_pk";--> statement-breakpoint
ALTER TABLE "meet" ALTER COLUMN "finalized" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vote" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_created_by_location_id_meet_id_unique" UNIQUE("created_by","location_id","meet_id");