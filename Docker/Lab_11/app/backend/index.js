import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { pool, initDb } from "./db.js";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

initDb();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).send({
      status: "ok",
      database: "connected",
    });
  } catch (err) {
    res.status(503).send({
      status: "error",
      database: "disconnected",
      error: err.message,
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.status(200).send({ items: result.rows });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { id, message, status } = req.body;
    if (!id || !message || !status) {
      return res.status(401).send({ error: "Nie podano wszystkich danych" });
    }

    await pool.query(
      "INSERT INTO tasks (id, message, status) VALUES ($1, $2, $3)",
      [id, message, status],
    );
    res.status(201).send({ message: "Dodano zadanie" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(401).send({ error: "Nie podano statusu zadania" });
    }

    if (!id) {
      return res.status(401).send({ error: "Nie podano id" });
    }

    const checkResult = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .send({ error: "Nie znaleziono zadania o podanym id" });
    }

    const updateResult = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );

    res.status(200).send({
      message: "Zaktualizowano status zadania",
      task: updateResult.rows[0],
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).send({ error: "Nie podano id" });
    }

    const checkResult = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .send({ error: "Nie znaleziono zadania o podanym id" });
    }

    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).send({ message: "Usunięto zadanie" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, (err) => {
  console.log(`App listening on port ${PORT}`);
});
