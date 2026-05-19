import fs from "fs";
import Redis from "ioredis";
import pkg from "pg";

const { Client } = pkg;

const POSTGRES_USER = fs.readFileSync("/run/secrets/db_user", "utf8").trim();
const POSTGRES_PASSWORD = fs
  .readFileSync("/run/secrets/db_password", "utf8")
  .trim();

const REDIS_URL = process.env.REDIS_URL;
const POSTGRES_DB = process.env.POSTGRES_DB;
const config = JSON.parse(fs.readFileSync("/app/app.config.json", "utf8"));
const redis = new Redis(REDIS_URL);
const pg = new Client({
  host: "postgres",
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});

await pg.connect();

console.log("Worker started...");

async function processJobs() {
  while (true) {
    try {
      const job = await redis.blpop("jobs", 0);

      if (job) {
        const data = JSON.parse(job[1]);
        console.log("Processing job:", data);

        await pg.query("INSERT INTO jobs(data) VALUES($1)", [
          JSON.stringify(data),
        ]);
      }
    } catch (err) {
      console.error("Worker error:", err);
    }
  }
}

processJobs();
