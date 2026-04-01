import "dotenv/config";
import prisma from "../db/client.js";
import { faker } from "@faker-js/faker";

faker.seed(7);

const HERO_POWERS = [
  "flight",
  "strength",
  "telepathy",
  "speed",
  "invisibility",
];
const HERO_STATUSES = ["available", "busy", "retired"];
const INCIDENT_LEVELS = ["low", "medium", "critical"];
const INCIDENT_STATUSES = ["open", "assigned", "resolved"];

async function main() {
  await prisma.incidentCategory.deleteMany();
  await prisma.incidents.deleteMany();
  await prisma.category.deleteMany();
  await prisma.heroes.deleteMany();

  const heroesPayload = Array.from({ length: 20 }).map(() => ({
    name: faker.person.fullName(),
    power: faker.helpers.arrayElement(HERO_POWERS),
    status: faker.helpers.arrayElement(HERO_STATUSES),
    missions_count: faker.number.int({ min: 0, max: 20 }),
  }));

  await prisma.heroes.createMany({
    data: heroesPayload,
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: "flood" },
      { name: "fire" },
      { name: "robbery" },
      { name: "terrorism" },
      { name: "accident" },
    ],
    skipDuplicates: true,
  });

  const heroes = await prisma.heroes.findMany({
    select: { id: true, status: true },
    orderBy: { id: "asc" },
  });
  const categories = await prisma.category.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });

  const availableHeroIds = heroes
    .filter((hero) => hero.status === "available")
    .map((hero) => hero.id);

  const incidentsPayload = Array.from({ length: 60 }).map(() => {
    const status = faker.helpers.arrayElement(INCIDENT_STATUSES);
    const assignHero = status === "assigned" && availableHeroIds.length > 0;

    return {
      location: faker.location.streetAddress(),
      district: faker.location.city(),
      level: faker.helpers.arrayElement(INCIDENT_LEVELS),
      status,
      hero_id: assignHero ? faker.helpers.arrayElement(availableHeroIds) : null,
      assigned_at: assignHero ? faker.date.recent({ days: 10 }) : null,
      resolved_at: status === "resolved" ? new Date() : null,
    };
  });

  await prisma.incidents.createMany({
    data: incidentsPayload,
    skipDuplicates: true,
  });

  const incidents = await prisma.incidents.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });

  const relationRows = incidents.flatMap((incident) => {
    const relationCount = faker.number.int({
      min: 1,
      max: Math.min(3, categories.length),
    });

    return faker.helpers
      .arrayElements(categories, relationCount)
      .map((category) => ({
        incidentId: incident.id,
        categoryId: category.id,
      }));
  });

  if (relationRows.length > 0) {
    await prisma.incidentCategory.createMany({
      data: relationRows,
      skipDuplicates: true,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
