import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;
const instanceId = process.env.HOSTNAME;

let items = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Mouse", price: 29.99, category: "Electronics" },
  { id: 3, name: "Desk", price: 199.99, category: "Furniture" },
];

app.use(cors());
app.use(json());

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
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
