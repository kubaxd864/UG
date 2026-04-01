import express from "express";
import dotenv from "dotenv";
import heroesRouter from "./routes/heroes.js";
import incidentsRouter from "./routes/incidents.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/heroes", heroesRouter);
app.use("/api/v1/incidents", incidentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
