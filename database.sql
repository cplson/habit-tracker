
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- GET all user habits
SELECT * FROM habits
WHERE user_id = 2;

-- GET habit log for selected habit
SELECT * FROM habit_log
JOIN habits ON habit_log.habit_id = habits.id
WHERE habits.id = 2;