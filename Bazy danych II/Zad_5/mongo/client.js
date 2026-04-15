import "dotenv/config";
import { MongoClient } from "mongodb";

const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

let client;

export function getClient() {
  if (!client) {
    const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGODB_URL (or MONGODB_URI) in .env.",
      );
    }
    client = new MongoClient(uri, options);
  }
  return client;
}

export function getDb(dbName) {
  return dbName ? getClient().db(dbName) : getClient().db();
}

export const connect = async () => getClient().connect();

export const disconnect = async () => {
  if (client) {
    await client.close();
  }
};

export const heroProfiles = () => getDb().collection("HeroProfile");

export const heroAuditLog = () => getDb().collection("HeroAuditLog");

export default {
  connect,
  disconnect,
  getClient,
  getDb,
  heroProfiles,
  heroAuditLog,
};
