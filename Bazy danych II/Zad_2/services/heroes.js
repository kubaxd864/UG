import heroRepository from "../repositories/heroes.js";

const toDTO = (row) => ({
  id: row.id,
  name: row.name,
  power: row.power,
  status: row.status,
  createdAt: row.created_at.toISOString(),
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

const ALLOWED_POWERS = [
  "flight",
  "strength",
  "telepathy",
  "speed",
  "invisibility",
];
const ALLOWED_STATUSES = ["available", "busy", "retired"];

const findAll = async ({ status, power } = {}) => {
  const rows = await heroRepository.findAll({ status, power });
  return rows.map(toDTO);
};

const findById = async (id) => {
  const row = await heroRepository.findById(id);
  if (!row) throw makeError("hero with that id doesn't exist", "NOT_FOUND");
  return toDTO(row);
};

const create = async ({ name, power, status }) => {
  if (!name?.trim()) throw makeError("Name is required", "VALIDATION_ERROR");
  if (!power?.trim()) throw makeError("Power is required", "VALIDATION_ERROR");
  if (!ALLOWED_POWERS.includes(power))
    throw makeError(
      "Power don't match the options avaliable",
      "VALIDATION_ERROR",
    );
  if (!ALLOWED_STATUSES.includes(status))
    throw makeError(
      "Status must be available, busy or retired",
      "VALIDATION_ERROR",
    );
  const existing = await heroRepository.findByName(name);
  if (existing) throw makeError("This Name already assigned", "CONFLICT");
  const row = await heroRepository.create({
    name: name.trim(),
    power: power.trim(),
    status,
  });
  return row ? toDTO(row) : null;
};

const updateById = async ({ id, name, power, status }) => {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw makeError("Hero id must be a positive integer", "VALIDATION_ERROR");
  }

  const hasAnyField = [name, power, status].some(
    (value) => value !== undefined,
  );
  if (!hasAnyField) {
    throw makeError(
      "At least one field must be provided: name, power or status",
      "VALIDATION_ERROR",
    );
  }

  const existingHero = await heroRepository.findById(parsedId);
  if (!existingHero)
    throw makeError("hero with that id doesn't exist", "NOT_FOUND");

  let normalizedName;
  let normalizedPower;
  let normalizedStatus;

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      throw makeError("Name cannot be empty", "VALIDATION_ERROR");
    }
    normalizedName = name.trim();

    const nameOwner = await heroRepository.findByName(normalizedName);
    if (nameOwner && nameOwner.id !== parsedId) {
      throw makeError("This Name already assigned", "CONFLICT");
    }
  }

  if (power !== undefined) {
    if (typeof power !== "string" || !power.trim()) {
      throw makeError("Power cannot be empty", "VALIDATION_ERROR");
    }
    normalizedPower = power.trim();
    if (!ALLOWED_POWERS.includes(normalizedPower)) {
      throw makeError(
        "Power don't match the options avaliable",
        "VALIDATION_ERROR",
      );
    }
  }

  if (status !== undefined) {
    if (typeof status !== "string" || !status.trim()) {
      throw makeError("Status cannot be empty", "VALIDATION_ERROR");
    }
    normalizedStatus = status.trim();
    if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
      throw makeError(
        "Status must be available, busy or retired",
        "VALIDATION_ERROR",
      );
    }
  }

  const row = await heroRepository.updateById({
    id: parsedId,
    name: normalizedName,
    power: normalizedPower,
    status: normalizedStatus,
  });
  return row ? toDTO(row) : null;
};

const getIncidentHistory = async ({ id, page, pageSize }) => {
  const parsedHeroId = Number(id);
  if (!Number.isInteger(parsedHeroId) || parsedHeroId <= 0) {
    throw makeError("Hero id must be a positive integer", "VALIDATION_ERROR");
  }

  const parsedPage = page === undefined ? 1 : Number(page);
  const parsedPageSize = pageSize === undefined ? 10 : Number(pageSize);

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

  const hero = await heroRepository.findById(parsedHeroId);
  if (!hero) throw makeError("hero with that id doesn't exist", "NOT_FOUND");

  const offset = (parsedPage - 1) * parsedPageSize;
  const rows = await heroRepository.findIncidentsByHeroId({
    heroId: parsedHeroId,
    limit: parsedPageSize,
    offset,
  });

  return {
    data: rows.map(toIncidentHistoryDTO),
    count: rows.length,
    page: parsedPage,
    pageSize: parsedPageSize,
  };
};

export default { findAll, findById, create, updateById, getIncidentHistory };
