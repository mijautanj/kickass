require("dotenv").config();

const { Client } = require("pg");
const client = new Client();
const database = client.connect();
console.log("connected");

const http = require("http");

const hostname = "0.0.0.0";
const port = process.env.PORT;

const server = http.createServer(async (req, res) => {
  if (req.url === "/exercises") {
    const result = await client.query("select * from kickass.exercises;");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(result.rows));
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("hello there");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
