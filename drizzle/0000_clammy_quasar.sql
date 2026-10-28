CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"github_url" text,
	"live_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
