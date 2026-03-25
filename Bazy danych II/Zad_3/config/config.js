import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const baseConfig = {
  dialect: "postgres",
  logging: false,
  pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
};

const configs = {
  development: {
    ...baseConfig,
    url: process.env.DATABASE_URL,
    logging: console.log,
  },
  test: {
    ...baseConfig,
    url: process.env.TEST_DATABASE_URL,
    pool: { max: 5, min: 1, acquire: 10000, idle: 5000 },
  },
  production: {
    ...baseConfig,
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
};

const env = process.env.NODE_ENV || "development";
const selectedConfig = configs[env];

export default new Sequelize(selectedConfig.url, selectedConfig);
