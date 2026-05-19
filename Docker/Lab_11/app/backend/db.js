import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        message TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `);
    console.log("Tabela tasks jest gotowa.");
  } catch (err) {
    console.error("Błąd podczas inicjalizacji bazy:", err);
  }
};

pool.on("error", (err) => {
  console.error("Pool error:", err.message);
  process.exit(1);
});

export { pool };
export default pool;
