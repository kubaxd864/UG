import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

let dbUser = "myuser";
let dbPassword = "mypassword";
try {
  dbUser = fs.readFileSync("/run/secrets/db_user", "utf8").trim();
  dbPassword = fs.readFileSync("/run/secrets/db_password", "utf8").trim();
} catch (err) {}

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    `postgres://${dbUser}:${dbPassword}@postgres:5432/${process.env.POSTGRES_DB || "mydb"}`,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Pool error:", err.message);
  process.exit(1);
});

export { pool };
export default pool;
