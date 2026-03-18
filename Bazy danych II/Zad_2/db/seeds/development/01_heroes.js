import { faker } from "@faker-js/faker";
faker.seed(7);

export async function seed(knex) {
  await knex("heroes").del();
  const heroes = Array.from({ length: 20 }, (_, i) => ({
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
  await knex("heroes").insert(heroes);
}
