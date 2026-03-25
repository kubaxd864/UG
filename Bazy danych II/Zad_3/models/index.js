import Sequelize from "sequelize";
import sequelize from "../config/config.js";
import Heroes from "./Heroes.js";
import Incidents from "./Incidents.js";

const db = {
  Sequelize,
  sequelize,
  Heroes,
  Incidents,
};

Object.values(db).forEach((model) => {
  if (model && typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
