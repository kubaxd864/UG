module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "TRUNCATE TABLE incidents, heroes RESTART IDENTITY CASCADE",
    );
  },

  async down() {
    // Reset seeder does not require rollback.
  },
};
