"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("heroes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(120),
      allowNull: false,
      unique: true,
    },
    power: {
      type: Sequelize.ENUM(
        "flight",
        "strength",
        "telepathy",
        "speed",
        "invisibility",
      ),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("available", "busy", "retired"),
      allowNull: false,
      defaultValue: "available",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.createTable("incidents", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING(180),
      allowNull: false,
    },
    level: {
      type: Sequelize.ENUM("low", "medium", "critical"),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("open", "assigned", "resolved"),
      allowNull: false,
      defaultValue: "open",
    },
    hero_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "heroes",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.addIndex("incidents", ["hero_id"]);
}
export async function down(queryInterface) {
  await queryInterface.dropTable("incidents");
  await queryInterface.dropTable("heroes");

  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_incidents_status";',
  );
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_incidents_level";',
  );
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_heroes_status";',
  );
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_heroes_power";',
  );
}
