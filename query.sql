CREATE SCHEMA kickass;
CREATE TABLE IF NOT EXISTS kickass.exercises(id serial PRIMARY KEY,name varchar(50) UNIQUE NOT NULL);

INSERT INTO kickass.exercises (name) VALUES ('Squats'), ('Deadlifts'), ('Bench Press');
