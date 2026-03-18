import { faker } from "@faker-js/faker";
faker.seed(7);

export async function seed(knex) {
  await knex("incidents").del();
  const levels = ["low", "medium", "critical"];
  const statuses = Array.from({ length: 60 }, (_, i) => {
    if (i < 20) return "open";
    if (i < 40) return "assigned";
    return "resolved";
  });

  const incidents = statuses.map((status, i) => {
    const now = new Date();
    const createdAt = faker.date.past({ years: 2, refDate: now });

    if (status === "open") {
      return {
        location: faker.location.streetAddress(),
        district: faker.helpers.maybe(() => faker.location.city(), {
          probability: 0.75,
        }),
        level: faker.helpers.arrayElement(levels),
        status,
        hero_id: null,
        assigned_at: null,
        resolved_at: null,
        created_at: createdAt,
        updated_at: now,
      };
    }

    const assignedAt = faker.date.between({ from: createdAt, to: now });
    const heroId = faker.number.int({ min: 1, max: 20 });

    if (status === "assigned") {
      return {
        location: faker.location.streetAddress(),
        district: faker.helpers.maybe(() => faker.location.city(), {
          probability: 0.75,
        }),
        level: faker.helpers.arrayElement(levels),
        status,
        hero_id: heroId,
        assigned_at: assignedAt,
        resolved_at: null,
        created_at: createdAt,
        updated_at: now,
      };
    }

    const resolvedAt = faker.date.between({ from: assignedAt, to: now });
    return {
      location: faker.location.streetAddress(),
      district: faker.helpers.maybe(() => faker.location.city(), {
        probability: 0.75,
      }),
      level: faker.helpers.arrayElement(levels),
      status,
      hero_id: heroId,
      assigned_at: assignedAt,
      resolved_at: resolvedAt,
      created_at: createdAt,
      updated_at: now,
    };
  });

  await knex("incidents").insert(incidents);
}
