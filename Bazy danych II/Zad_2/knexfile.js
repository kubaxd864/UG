import dotenv from "dotenv";
dotenv.config();

/**
 * @type {import('knex').Knex.Config}
 */
const config = {
  // ─── DEVELOPMENT ──────────────────────────────────────────────
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds/development",
    },
    debug: true,
  },

  // ─── TEST ──────────────────────────────────────────────────────
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_TEST_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds/test",
    },
  },

  // ─── PRODUCTION ────────────────────────────────────────────────
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
  },
};

export default config;
