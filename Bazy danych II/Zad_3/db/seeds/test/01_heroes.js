module.exports = {
  async up(queryInterface) {
    const heroes = [
      {
        id: 1,
        name: "Adam",
        power: "flight",
        status: "available",
        missions_count: 0,
        created_at: new Date("2025-01-01T10:00:00Z"),
        updated_at: new Date("2025-01-01T10:00:00Z"),
      },
      {
        id: 2,
        name: "Tomasz",
        power: "strength",
        status: "busy",
        missions_count: 3,
        created_at: new Date("2025-01-02T10:00:00Z"),
        updated_at: new Date("2025-01-02T10:00:00Z"),
      },
      {
        id: 3,
        name: "Katarzyna",
        power: "telepathy",
        status: "available",
        missions_count: 1,
        created_at: new Date("2025-01-03T10:00:00Z"),
        updated_at: new Date("2025-01-03T10:00:00Z"),
      },
      {
        id: 4,
        name: "Marek",
        power: "speed",
        status: "retired",
        missions_count: 42,
        created_at: new Date("2025-01-04T10:00:00Z"),
        updated_at: new Date("2025-01-04T10:00:00Z"),
      },
      {
        id: 5,
        name: "Ola",
        power: "invisibility",
        status: "busy",
        missions_count: 5,
        created_at: new Date("2025-01-05T10:00:00Z"),
        updated_at: new Date("2025-01-05T10:00:00Z"),
      },
    ];

    await queryInterface.bulkInsert("heroes", heroes, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("heroes", null, {});
  },
};
