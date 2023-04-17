
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

-- POST new habit
INSERT INTO habits (user_id, description)
VALUES (2, 'sample');

-- DELETE habit
DELETE FROM habits
WHERE id=5 AND user_id = 2;
-- GET habit log for selected habit
SELECT habit_log.id, status, notes FROM habit_log
JOIN habits ON habit_log.habit_id = habits.id
WHERE habits.id = 2;
