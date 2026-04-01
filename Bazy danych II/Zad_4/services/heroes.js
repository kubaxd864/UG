import prisma from "../db/client.js";
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

export default { findAll, findById, create, updateById, getIncidentHistory };
