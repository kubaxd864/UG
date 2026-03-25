export async function up(queryInterface) {
  await queryInterface.sequelize.query(
    "TRUNCATE TABLE incidents, heroes RESTART IDENTITY CASCADE",
  );
}
export async function down() {}
