import { faker } from "@faker-js/faker";
faker.seed(7);

export async function up(queryInterface) {
  await queryInterface.bulkDelete("heroes", null, {});

  const heroes = Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    power: faker.helpers.arrayElement([
      "flight",
      "strength",
      "telepathy",
      "speed",
      "invisibility",
    ]),
    status: faker.helpers.arrayElement(["available", "busy", "retired"]),
    missions_count: faker.number.int({ min: 0, max: 20 }),
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await queryInterface.bulkInsert("heroes", heroes, {});
}
export async function down(queryInterface) {
  await queryInterface.bulkDelete("heroes", null, {});
}
