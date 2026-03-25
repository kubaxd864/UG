import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import heroesRouter from "./routes/heroes.js";
import incidentsRouter from "./routes/incidents.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/heroes", heroesRouter);
app.use("/api/v1/incidents", incidentsRouter);

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
