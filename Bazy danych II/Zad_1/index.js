import express from "express";
import dotenv from "dotenv";
import heroesRouter from "./routes/heroes.js";
import incidentsRouter from "./routes/incidents.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/heroes", heroesRouter);
app.use("/api/v1/incidents", incidentsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
