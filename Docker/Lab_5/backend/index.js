import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const PORT = 5000;
export function createApp(options = {}) {
  const app = express();
  const instanceId = options.instanceId ?? process.env.HOSTNAME ?? "local-dev";
  const startedAt = Date.now();
  let requestCount = 0;

  let items = [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
    { id: 2, name: "Mouse", price: 29.99, category: "Electronics" },
    { id: 3, name: "Desk", price: 199.99, category: "Furniture" },
  ];

  app.use(cors());
  app.use(json());
  app.use((req, res, next) => {
    requestCount += 1;
    next();
  });

  const getUptimeSeconds = () => Number(process.uptime().toFixed(2));

  app.get("/items", (req, res) => {
    res.json(items);
  });

  app.post("/items", (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = {
      id: items.length + 1,
      name,
      price: parseFloat(price),
      category,
    };

    items.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.get("/stats", (req, res) => {
    const totalProducts = items.length;
    const totalValue = items.reduce((sum, p) => sum + p.price, 0);
    const categories = [...new Set(items.map((p) => p.category))];

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
  });

  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: getUptimeSeconds(),
      requestsCount: requestCount,
      serverTime: new Date().toISOString(),
    });
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
