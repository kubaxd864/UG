import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Heroes = sequelize.define(
  "Heroes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    power: {
      type: DataTypes.ENUM(
        "flight",
        "strength",
        "telepathy",
        "speed",
        "invisibility",
      ),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "busy", "retired"),
      allowNull: false,
      defaultValue: "available",
    },
    missions_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "heroes",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeValidate: (hero, options) => {
        if (hero.name) {
          hero.name = hero.name.trim();
        }
      },
    },
    scopes: {
      available: {
        where: { status: "available" },
      },
      withPower: (power) => ({
        where: { power },
      }),
      withMissions: (limit = 10) => ({
        order: [["missions_count", "DESC"]],
        limit,
      }),
    },
  },
);

Heroes.associate = (models) => {
  Heroes.hasMany(models.Incidents, {
    foreignKey: "hero_id",
    as: "incidents",
  });
};

export default Heroes;
