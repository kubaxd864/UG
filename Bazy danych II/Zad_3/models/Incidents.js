import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Incidents = sequelize.define(
  "Incidents",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    level: {
      type: DataTypes.ENUM("low", "medium", "critical"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("open", "assigned", "resolved"),
      allowNull: false,
      defaultValue: "open",
    },
    hero_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "heroes",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    assigned_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "incidents",
    timestamps: true,
    underscored: true,
    hooks: {
      afterUpdate: async (incident, options) => {
        const previousStatus = incident.previous("status");
        const currentStatus = incident.status;
        if (previousStatus === "assigned" && currentStatus === "resolved") {
          const HeroModel = incident.sequelize.models.Heroes;
          await HeroModel.increment("missions_count", {
            by: 1,
            where: { id: incident.hero_id },
            transaction: options.transaction,
          });
        }
      },
    },
  },
);

Incidents.associate = (models) => {
  Incidents.belongsTo(models.Heroes, {
    foreignKey: "hero_id",
    as: "hero",
  });
};

export default Incidents;
