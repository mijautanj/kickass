require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const dbURL = process.env.DATABASE_URL;

const { Client } = require("pg");
const client = new Client({
  connectionString: dbURL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();
console.log("connected");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.end("hello there");
});

app.get("/exercises", async (req, res) => {
  const result = await client.query("select * from kickass.exercises;");
  res.send(result.rows);
});

app.post("/exercises", async (req, res) => {
  const exercise = req.body.exercise;

  if (exercise !== undefined) {
    const result = await client.query(
      `insert into kickass.exercises (name) values ('${exercise}') ON CONFLICT DO NOTHING`
    );
    res.send(req.body.exercise);
  }

  res.send("ERROR: please provide an exercise");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
