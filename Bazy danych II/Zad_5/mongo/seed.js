import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";
import { fileURLToPath } from "node:url";
import mongoClient from "./client.js";

const SEED_CONFIG = {
  TOTAL_HEROES: 20,
  BATCH_SIZE: 20,
};

function generateHeroProfile(heroId, postgresData) {
  const hasSpecializations = faker.datatype.boolean(0.7);
  const specializations = hasSpecializations
    ? faker.helpers.arrayElements(
        ["Combat", "Stealth", "Technology", "Magic", "Diplomacy"],
        { min: 1, max: 4 },
      )
    : [];
  const incidentCount = faker.number.int({ min: 0, max: 5 });
  const recentIncidents = Array.from({ length: incidentCount }, () => ({
    incidentId: faker.number.int({ min: 1000, max: 9999 }),
    level: faker.helpers.arrayElement(["Low", "Medium", "High", "Critical"]),
    location: faker.location.city(),
    resolvedAt: faker.date.recent({ days: 30 }),
  }));

  const totalMissions = Number(postgresData.missionsCount);
  const criticalMissions = faker.number.int({
    min: 0,
    max: Math.floor(totalMissions * 0.3),
  });

  const document = {
    heroId: heroId,
    heroName: postgresData.name,
    power: postgresData.power,
    bio: faker.lorem.paragraph(),
    stats: {
      totalMissions: totalMissions,
      criticalMissions: criticalMissions,
      lastMissionAt: faker.date.recent({ days: 90 }),
    },
    recentIncidents: recentIncidents,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (specializations.length > 0) {
    document.specializations = specializations;
  }

  return document;
}

async function fetchHeroesFromPostgreSQL() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  try {
    const result = await pool.query(
      `
        SELECT id, name, power, missions_count
        FROM heroes
        ORDER BY id ASC
        LIMIT $1
      `,
      [SEED_CONFIG.TOTAL_HEROES],
    );

    if (result.rows.length < SEED_CONFIG.TOTAL_HEROES) {
      throw new Error(
        `Expected at least ${SEED_CONFIG.TOTAL_HEROES} heroes in PostgreSQL, got ${result.rows.length}. Run seed in PostgreSQL first.`,
      );
    }

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      power: row.power,
      missionsCount: row.missions_count,
    }));
  } finally {
    await pool.end();
  }
}

async function seedHeroProfiles() {
  console.log("Starting MongoDB seed");
  try {
    await mongoClient.connect();
    const collection = mongoClient.heroProfiles();
    const auditCollection = mongoClient.heroAuditLog();
    const heroesFromPG = await fetchHeroesFromPostgreSQL();
    console.log(`Retrieved heroes data from PostgreSQL`);
    await collection.deleteMany({});

    const documents = heroesFromPG.map((hero) =>
      generateHeroProfile(hero.id, {
        name: hero.name,
        power: hero.power,
        missionsCount: hero.missionsCount,
      }),
    );

    await collection.insertMany(documents, { ordered: false });
    await auditCollection.insertOne({
      type: "SEED_HERO_PROFILE",
      count: documents.length,
      createdAt: new Date(),
    });
    console.log(`Inserted documents into HeroProfile`);
  } catch (error) {
    throw error;
  } finally {
    await mongoClient.disconnect();
  }
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  seedHeroProfiles().catch(() => {
    process.exitCode = 1;
  });
}

export { seedHeroProfiles, generateHeroProfile };
