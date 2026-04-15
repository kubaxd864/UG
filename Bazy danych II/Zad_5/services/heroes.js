import prisma from "../db/client.js";
import heroProfileRepository from "../repositories/heroProfile.js";
import { Prisma } from "@prisma/client";

const toDTO = (row) => ({
  id: row.id,
  name: row.name,
  power: row.power,
  status: row.status,
  createdAt: row.created_at ? row.created_at.toISOString() : null,
});

const toIncidentHistoryDTO = (row) => ({
  id: row.id,
  location: row.location,
  level: row.level,
  status: row.status,
  heroId: row.hero_id,
  assignedAt: row.assigned_at ? row.assigned_at.toISOString() : null,
  createdAt: row.created_at ? row.created_at.toISOString() : null,
});

const toProfileDTO = (row) => ({
  heroId: row.heroId,
  heroName: row.heroName,
  power: row.power,
  bio: row.bio ?? null,
  specializations: Array.isArray(row.specializations)
    ? row.specializations
    : [],
  stats: row.stats ?? null,
  recentIncidents: Array.isArray(row.recentIncidents)
    ? row.recentIncidents
    : [],
  deletedAt: row.deletedAt ? row.deletedAt.toISOString() : null,
  createdAt: row.createdAt ? row.createdAt.toISOString() : null,
  updatedAt: row.updatedAt ? row.updatedAt.toISOString() : null,
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

const toOptionalPositiveInt = (value, fieldName) => {
  if (value === undefined || value === null || value === "") return undefined;
  return toPositiveInt(value, fieldName);
};

const toBooleanOrUndefined = (value, fieldName) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;

  throw makeError(`${fieldName} must be true or false`, "VALIDATION_ERROR");
};

const normalizePowers = (powers) => {
  if (powers === undefined || powers === null || powers === "")
    return undefined;

  const values = Array.isArray(powers)
    ? powers
    : String(powers)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

  if (values.length === 0) {
    throw makeError("powers must not be empty", "VALIDATION_ERROR");
  }

  return values;
};

const mapPrismaError = (err) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return makeError("This Name already used", "CONFLICT");
    }
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
    if (message.includes("Argument `name` is missing")) {
      return makeError("Name is required", "VALIDATION_ERROR");
    }
    if (message.includes("Argument `power` is missing")) {
      return makeError("Power is required", "VALIDATION_ERROR");
    }
    if (message.includes("Argument `status` is missing")) {
      return makeError("Status is required", "VALIDATION_ERROR");
    }
    return makeError("Payload does not match schema", "VALIDATION_ERROR");
  }

  return err;
};

const findAll = async ({ status, power } = {}) => {
  try {
    const rows = await prisma.heroes.findMany({
      where: {
        status: status?.trim() || undefined,
        power: power?.trim() || undefined,
      },
      orderBy: { id: "asc" },
    });
    return rows.map(toDTO);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const findById = async (id) => {
  const parsedId = toPositiveInt(id, "Hero id");
  try {
    const row = await prisma.heroes.findUnique({
      where: { id: parsedId },
    });
    if (!row) throw makeError("hero with that id doesn't exist", "NOT_FOUND");
    return toDTO(row);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const create = async ({ name, power, status }) => {
  try {
    const row = await prisma.heroes.create({
      data: {
        name: name?.trim(),
        power: power?.trim(),
        status: status?.trim(),
      },
    });
    return toDTO(row);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const updateById = async ({ id, name, power, status }) => {
  const parsedId = toPositiveInt(id, "Hero id");
  const hasAnyField = [name, power, status].some(
    (value) => value !== undefined,
  );

  if (!hasAnyField) {
    throw makeError(
      "At least one field must be provided: name, power or status",
      "VALIDATION_ERROR",
    );
  }

  try {
    const row = await prisma.heroes.update({
      where: { id: parsedId },
      data: {
        name: name?.trim() || undefined,
        power: power?.trim() || undefined,
        status: status?.trim() || undefined,
      },
    });
    return toDTO(row);
  } catch (err) {
    throw mapPrismaError(err);
  }
};

const getIncidentHistory = async ({ id, page, pageSize }) => {
  const parsedHeroId = toPositiveInt(id, "Hero id");
  const parsedPage = page === undefined ? 1 : Number(page);
  const parsedPageSize = pageSize === undefined ? 10 : Number(pageSize);
  const offset = (parsedPage - 1) * parsedPageSize;

  if (!Number.isInteger(parsedPage) || parsedPage <= 0) {
    throw makeError("page must be a positive integer", "VALIDATION_ERROR");
  }
  if (
    !Number.isInteger(parsedPageSize) ||
    parsedPageSize <= 0 ||
    parsedPageSize > 100
  ) {
    throw makeError(
      "pageSize must be a positive integer not greater than 100",
      "VALIDATION_ERROR",
    );
  }

  const hero = await prisma.heroes.findUnique({
    where: { id: parsedHeroId },
    select: { id: true },
  });
  if (!hero) throw makeError("hero with that id doesn't exist", "NOT_FOUND");

  const rows = await prisma.incidents.findMany({
    where: {
      hero_id: parsedHeroId,
    },
    select: {
      id: true,
      location: true,
      level: true,
      status: true,
      hero_id: true,
      assigned_at: true,
      created_at: true,
    },
    orderBy: { assigned_at: "desc" },
    take: parsedPageSize,
    skip: offset,
  });

  return {
    data: rows.map(toIncidentHistoryDTO),
    count: rows.length,
    page: parsedPage,
    pageSize: parsedPageSize,
  };
};

const getProfiles = async ({
  powers,
  minMissions,
  withBio,
  specialization,
  page,
  limit,
} = {}) => {
  const parsedPage = page === undefined ? 1 : toPositiveInt(page, "page");
  const parsedLimit = limit === undefined ? 20 : toPositiveInt(limit, "limit");

  if (parsedLimit > 100) {
    throw makeError("limit cannot be greater than 100", "VALIDATION_ERROR");
  }

  const parsedPowers = normalizePowers(powers);
  const parsedMinMissions = toOptionalPositiveInt(minMissions, "minMissions");
  const parsedWithBio = toBooleanOrUndefined(withBio, "withBio");
  const parsedSpecialization =
    specialization === undefined ||
    specialization === null ||
    !String(specialization).trim()
      ? undefined
      : String(specialization).trim();

  const rows = await heroProfileRepository.findProfiles({
    powers: parsedPowers,
    minMissions: parsedMinMissions,
    withBio: parsedWithBio,
    specialization: parsedSpecialization,
    page: parsedPage,
    limit: parsedLimit,
  });

  return rows.map(toProfileDTO);
};

const getProfilesById = async (id) => {
  const parsedId = toPositiveInt(id, "Hero id");
  const row = await heroProfileRepository.findProfileByHeroId(parsedId);
  if (!row)
    throw makeError("hero profile with that id doesn't exist", "NOT_FOUND");
  return toProfileDTO(row);
};

const addSpecialization = async ({ id, specialization }) => {
  const parsedId = toPositiveInt(id, "Hero id");
  const normalizedSpecialization = String(specialization ?? "").trim();

  if (!normalizedSpecialization) {
    throw makeError("specialization is required", "VALIDATION_ERROR");
  }

  const row = await heroProfileRepository.addSpecializationByHeroId({
    heroId: parsedId,
    specialization: normalizedSpecialization,
  });
  if (!row)
    throw makeError("hero profile with that id doesn't exist", "NOT_FOUND");
  return toProfileDTO(row);
};

const updateProfile = async ({ id, bio }) => {
  const parsedId = toPositiveInt(id, "Hero id");
  const normalizedBio = String(bio ?? "").trim();

  if (!normalizedBio) {
    throw makeError("bio is required", "VALIDATION_ERROR");
  }

  const row = await heroProfileRepository.updateBioByHeroId({
    heroId: parsedId,
    bio: normalizedBio,
  });
  if (!row)
    throw makeError("hero profile with that id doesn't exist", "NOT_FOUND");
  return toProfileDTO(row);
};

const deleteSpecialization = async ({ id, name }) => {
  const parsedId = toPositiveInt(id, "Hero id");
  const normalizedName = String(name ?? "").trim();

  if (!normalizedName) {
    throw makeError("specialization name is required", "VALIDATION_ERROR");
  }

  const row = await heroProfileRepository.deleteSpecializationByHeroId({
    heroId: parsedId,
    specialization: normalizedName,
  });
  if (!row)
    throw makeError("hero profile with that id doesn't exist", "NOT_FOUND");
  return toProfileDTO(row);
};

const deleteProfile = async ({ id }) => {
  const parsedId = toPositiveInt(id, "Hero id");

  const row = await heroProfileRepository.softDeleteByHeroId({
    heroId: parsedId,
  });
  if (!row)
    throw makeError("hero profile with that id doesn't exist", "NOT_FOUND");
  return toProfileDTO(row);
};

export default {
  findAll,
  findById,
  create,
  updateById,
  getIncidentHistory,
  getProfiles,
  getProfilesById,
  addSpecialization,
  updateProfile,
  deleteSpecialization,
  deleteProfile,
};
