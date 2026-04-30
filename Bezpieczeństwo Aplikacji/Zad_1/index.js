import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;
const app = express();
const instanceId = process.env.HOSTNAME;
const startedAt = Date.now();
let requestCount = 0;

let items = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Mouse", price: 29.99, category: "Electronics" },
  { id: 3, name: "Desk", price: 199.99, category: "Furniture" },
];

const basicAuth = (req, res, next) => {
  const NAME = process.env.NAME;
  const PASSWORD = process.env.PASSWORD;

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");
  if (username == NAME && password == PASSWORD) {
    return next();
  }

  return res.status(401).json({ message: "Invalid login data" });
};

app.use(cors());
app.use(json());
app.use((req, res, next) => {
  requestCount += 1;
  next();
});

app.get("/items", basicAuth, (req, res) => {
  try {
    res.json(items);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log("App listen on port 5000");
});
