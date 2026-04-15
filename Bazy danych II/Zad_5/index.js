import express from "express";
import dotenv from "dotenv";
import { getClient } from "./mongo/client.js";
import heroesRouter from "./routes/heroes.js";
import incidentsRouter from "./routes/incidents.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let server;

app.use(express.json());
app.use("/api/v1/heroes", heroesRouter);
app.use("/api/v1/incidents", incidentsRouter);

async function shutdown(signal) {
  console.log(`Received signal ${signal}, shutting down...`);
  try {
    await getClient().close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Błąd przy zamykaniu połączenia:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

async function start() {
  try {
    await getClient().connect();
    console.log("Connected to MongoDB");
    console.log("Connected to PostgreSQL");

    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Błąd połączenia z MongoDB:", err);
    process.exit(1);
  }
}

start();
