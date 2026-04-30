import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { pool } from "./db.js";
dotenv.config();

const PORT = 5000;
export function createApp(options = {}) {
  const app = express();
  const instanceId = options.instanceId ?? process.env.HOSTNAME ?? "local-dev";
  const startedAt = Date.now();
  let requestCount = 0;

  app.use(cors());
  app.use(json());
  app.use((req, res, next) => {
    requestCount += 1;
    next();
  });

  const getUptimeSeconds = () => Number(process.uptime().toFixed(2));

  app.get("/items", async (req, res) => {
    try {
      const data = await pool.query("SELECT * FROM items ORDER BY id");
      res.json(data);
    } catch (err) {
      console.error(err);
    }
  });

  app.post("/items", async (req, res) => {
    try {
      const { name, price } = req.body ?? {};
      const parsedPrice = Number(price);

      if (
        typeof name !== "string" ||
        name.trim() === "" ||
        !Number.isFinite(parsedPrice)
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const result = await pool.query(
        "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *",
        [name.trim(), parsedPrice],
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/stats", async (req, res) => {
    try {
      const data = await pool.query("SELECT * FROM items ORDER BY id");
      const items = data.rows;
      const totalProducts = items.length;
      const totalValue = items.reduce((sum, p) => sum + Number(p.price), 0);
      const categories = [
        ...new Set(items.map((p) => p.category).filter(Boolean)),
      ];

      res.json({
        totalProducts,
        totalValue,
        categoriesCount: categories.length,
        instanceId,
        uptime: getUptimeSeconds(),
        requestsCount: requestCount,
        serverTime: new Date().toISOString(),
        startedAt: new Date(startedAt).toISOString(),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: getUptimeSeconds(),
      requestsCount: requestCount,
      serverTime: new Date().toISOString(),
    });
  });

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const app = createApp();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
