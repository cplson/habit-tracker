
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	CONSTRAINT "User Profile_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "motivations" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"motivation" varchar(500) NOT NULL,
	CONSTRAINT "motivations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "blessings" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"blessing" varchar(500) NOT NULL,
	CONSTRAINT "blessings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "habit_log" (
	"id" serial NOT NULL,
	"habit_id" integer NOT NULL,
	"date" DATE NOT NULL,
	"status" varchar(20) NOT NULL,
	"notes" varchar(500),
	CONSTRAINT "habit_log_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "habits" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "habits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

SELECT * FROM motivations
WHERE user_id = 2;

-- sample POST
INSERT INTO motivations (user_id, motivation)
VALUES (5, 'to be the biggest beast');
