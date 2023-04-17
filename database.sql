
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

-- TEMPORARY POST new habit log entry
INSERT INTO habit_log (habit_id, date, status, notes)
VALUES (2, 'April 12, 2023', 'D', 'D');

-- TEMPORARY PUT edit existing habit log entry
UPDATE habit_log
SET status = 'unsuccessful',
	notes = 'no problem'
WHERE id = 1; 

-- TEMPORARY DELETE habit logs for a habit that is to be deleted
DELETE FROM habit_log
WHERE habit_id = 1;