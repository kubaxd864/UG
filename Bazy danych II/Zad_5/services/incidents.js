import prisma from "../db/client.js";
import { Prisma } from "@prisma/client";

const INCIDENT_INCLUDE = {
  heroes: {
    select: {
      id: true,
      name: true,
      power: true,
      status: true,
    },
  },
  categories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
};

const toDTO = (row) => ({
  id: row.id,
  location: row.location,
  level: row.level,
  status: row.status,
  heroId: row.hero_id,
  assignedAt: row.assigned_at ? row.assigned_at.toISOString() : null,
  createdAt: row.created_at ? row.created_at.toISOString() : null,
  hero: row.heroes
    ? {
        id: row.heroes.id,
        name: row.heroes.name,
        power: row.heroes.power,
        status: row.heroes.status,
      }
    : null,
  categories: row.categories
    ? row.categories.map((link) => ({
        id: link.category.id,
        name: link.category.name,
      }))
    : undefined,
});

const makeError = (message, code) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

const toPositiveInt = (value, fieldName) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw makeError(
      `${fieldName} must be a positive integer`,
      "VALIDATION_ERROR",
    );
  }
  return parsed;
};

const toPositiveIntList = (value, fieldName) => {
  if (value === undefined || value === null || value === "") return [];

  const items = Array.isArray(value)
    ? value.flatMap((item) => String(item).split(","))
    : String(value).split(",");

  const parsed = items
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => toPositiveInt(item, fieldName));

  return [...new Set(parsed)];
};

const mapPrismaError = (err) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2000") {
      return makeError(
        "Payload exceeds schema field length",
        "VALIDATION_ERROR",
      );
    }
    if (err.code === "P2003") {
      return makeError("Related record does not exist", "VALIDATION_ERROR");
    }
    if (err.code === "P2011") {
      return makeError("Required field cannot be null", "VALIDATION_ERROR");
    }
    if (err.code === "P2025") {
      return makeError("record doesn't exist", "NOT_FOUND");
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    const message = String(err.message || "");
    if (message.includes("Argument `location` is missing")) {
      return makeError("Location is required", "VALIDATION_ERROR");
    }
    if (message.includes("Argument `level` is missing")) {
      return makeError("Level is required", "VALIDATION_ERROR");
    }
    if (message.includes("Argument `status` is missing")) {
      return makeError("Status is required", "VALIDATION_ERROR");
    }
    return makeError("Payload does not match schema", "VALIDATION_ERROR");
  }

  return err;
};

const findAll = async ({ level, status, categoryId, exclude } = {}) => {
  const includeIds = toPositiveIntList(categoryId, "categoryId");
  const excludeIds = toPositiveIntList(exclude, "exclude");

  const andFilters = [];
  if (includeIds.length > 0) {
    andFilters.push({
      categories: {
        some: {
          categoryId: { in: includeIds },
        },
      },
    });
  }
  if (excludeIds.length > 0) {
    andFilters.push({
      categories: {
        none: {
          categoryId: { in: excludeIds },
        },
      },
    });
  }

  try {
    const rows = await prisma.incidents.findMany({
      where: {
        level: level?.trim() || undefined,
        status: status?.trim() || undefined,
        AND: andFilters.length > 0 ? andFilters : undefined,
      },
      orderBy: { id: "asc" },
    });
    return rows.map(toDTO);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const findById = async (id) => {
  const parsedId = toPositiveInt(id, "Incident id");

  try {
    const row = await prisma.incidents.findUnique({
      where: { id: parsedId },
      include: INCIDENT_INCLUDE,
    });
    if (!row)
      throw makeError("incident with that id doesn't exist", "NOT_FOUND");
    return toDTO(row);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const create = async ({ location, level, status, categoryIds } = {}) => {
  const parsedCategoryIds = toPositiveIntList(categoryIds, "categoryIds");

  try {
    const row = await prisma.incidents.create({
      data: {
        location: location?.trim() || undefined,
        level: level?.trim() || undefined,
        status: status?.trim() || undefined,
        categories:
          parsedCategoryIds.length > 0
            ? {
                create: parsedCategoryIds.map((id) => ({
                  category: {
                    connect: { id },
                  },
                })),
              }
            : undefined,
      },
      include: INCIDENT_INCLUDE,
    });

    return toDTO(row);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const assignNewHero = async ({ incidentId, heroId }) => {
  const parsedIncidentId = toPositiveInt(incidentId, "Incident id");
  const parsedHeroId = toPositiveInt(heroId, "Hero id");

  try {
    return await prisma.$transaction(async (tx) => {
      const incident = await tx.incidents.findUnique({
        where: { id: parsedIncidentId },
        select: { id: true, hero_id: true, level: true },
      });

      if (!incident) {
        throw makeError("incident with that id doesn't exist", "NOT_FOUND");
      }

      if (incident.hero_id !== null) {
        throw makeError("incident has already assigned hero", "CONFLICT");
      }

      const hero = await tx.heroes.findUnique({
        where: { id: parsedHeroId },
        select: { id: true, status: true, power: true },
      });

      if (!hero) {
        throw makeError("hero with that id doesn't exist", "NOT_FOUND");
      }

      if (hero.status !== "available") {
        throw makeError(
          "hero with that id is currently unavailable",
          "CONFLICT",
        );
      }

      const isCriticalIncident =
        String(incident.level).toLowerCase() === "critical";
      if (isCriticalIncident) {
        const allowedPowersForCritical = ["strength", "telepathy"];
        if (!allowedPowersForCritical.includes(hero.power)) {
          throw makeError(
            "hero power does not meet critical incident requirements",
            "FORBIDDEN",
          );
        }
      }

      await tx.heroes.update({
        where: { id: parsedHeroId },
        data: {
          status: "busy",
          missions_count: { increment: 1 },
        },
      });

      const row = await tx.incidents.update({
        where: { id: parsedIncidentId },
        data: {
          hero_id: parsedHeroId,
          assigned_at: new Date(),
          status: "assigned",
        },
      });

      return toDTO(row);
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const closeIncident = async (id) => {
  const parsedIncidentId = toPositiveInt(id, "Incident id");

  try {
    return await prisma.$transaction(async (tx) => {
      const incident = await tx.incidents.findUnique({
        where: { id: parsedIncidentId },
        select: { id: true, hero_id: true, status: true },
      });

      if (!incident) {
        throw makeError("incident with that id doesn't exist", "NOT_FOUND");
      }

      if (incident.status === "resolved") {
        throw makeError("incident is already resolved", "CONFLICT");
      }

      if (incident.hero_id !== null) {
        await tx.heroes.update({
          where: { id: incident.hero_id },
          data: { status: "available" },
        });
      }

      const row = await tx.incidents.update({
        where: { id: parsedIncidentId },
        data: {
          status: "resolved",
          resolved_at: new Date(),
        },
      });
      return toDTO(row);
    });
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const getStats = async () => {
  const [byStatus, byLevel] = await Promise.all([
    prisma.$queryRaw`
      SELECT status::text AS status, COUNT(*)::int AS count
      FROM incidents
      GROUP BY status
      ORDER BY status
    `,
    prisma.$queryRaw`
      SELECT level::text AS level, COUNT(*)::int AS count
      FROM incidents
      GROUP BY level
      ORDER BY level
    `,
  ]);

  return { byStatus, byLevel };
};

export default {
  findAll,
  findById,
  create,
  assignNewHero,
  closeIncident,
  getStats,
};
