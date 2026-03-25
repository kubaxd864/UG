import db from "../models/index.js";

const { Heroes: Hero, Incidents: Incident, sequelize } = db;

const toDTO = (row) => ({
  id: row.id,
  name: row.name,
  power: row.power,
  status: row.status,
  createdAt: row.createdAt.toISOString(),
});

const toIncidentHistoryDTO = (row) => ({
  id: row.id,
  location: row.location,
  level: row.level,
  status: row.status,
  heroId: row.hero_id,
  assignedAt: row.assignedAt ? row.assignedAt.toISOString() : null,
  createdAt: row.createdAt ? row.createdAt.toISOString() : null,
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
  const where = {};
  if (status != null && status !== "") {
    where.status = status;
  }
  if (power != null && power !== "") {
    where.power = power;
  }
  const rows = await Hero.findAll({
    where,
    order: [["id", "ASC"]],
  });
  return rows.map(toDTO);
};

const findById = async (id) => {
  const row = await Hero.findByPk(id);
  if (!row) throw makeError("hero with that id doesn't exist", "NOT_FOUND");
  return toDTO(row);
};

const create = async ({ name, power, status }) => {
  const normalizedName = name?.trim();
  const normalizedPower = power?.trim();

  if (!normalizedName) throw makeError("Name is required", "VALIDATION_ERROR");
  if (!normalizedPower)
    throw makeError("Power is required", "VALIDATION_ERROR");
  if (!ALLOWED_POWERS.includes(normalizedPower)) {
    throw makeError(
      "Power don't match the options avaliable",
      "VALIDATION_ERROR",
    );
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    throw makeError(
      "Status must be available, busy or retired",
      "VALIDATION_ERROR",
    );
  }

  return sequelize.transaction(async (transaction) => {
    const existing = await Hero.findOne({
      where: { name: normalizedName },
      attributes: ["id"],
      transaction,
    });
    if (existing) throw makeError("This Name already assigned", "CONFLICT");

    const row = await Hero.create(
      { name: normalizedName, power: normalizedPower, status },
      { transaction },
    );

    return toDTO(row);
  });
};

const updateById = async ({ id, name, power, status }) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
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

  return sequelize.transaction(async (transaction) => {
    const existingHero = await Hero.findByPk(Number(id), { transaction });
    if (!existingHero)
      throw makeError("hero with that id doesn't exist", "NOT_FOUND");

    const patch = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        throw makeError("Name cannot be empty", "VALIDATION_ERROR");
      }
      const normalizedName = name.trim();
      const nameOwner = await Hero.findOne({
        where: { name: normalizedName },
        attributes: ["id"],
        transaction,
      });
      if (nameOwner && nameOwner.id !== Number(id)) {
        throw makeError("This Name already used", "CONFLICT");
      }
      patch.name = normalizedName;
    }

    if (power !== undefined) {
      if (typeof power !== "string" || !power.trim()) {
        throw makeError("Power cannot be empty", "VALIDATION_ERROR");
      }
      const normalizedPower = power.trim();
      if (!ALLOWED_POWERS.includes(normalizedPower)) {
        throw makeError(
          "Power don't match the options avaliable",
          "VALIDATION_ERROR",
        );
      }
      patch.power = normalizedPower;
    }

    if (status !== undefined) {
      if (typeof status !== "string" || !status.trim()) {
        throw makeError("Status cannot be empty", "VALIDATION_ERROR");
      }
      const normalizedStatus = status.trim();
      if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
        throw makeError(
          "Status must be available, busy or retired",
          "VALIDATION_ERROR",
        );
      }
      patch.status = normalizedStatus;
    }

    const row = await existingHero.update(patch, { transaction });
    return row ? toDTO(row) : null;
  });
};

const getIncidentHistory = async ({ id, page, pageSize }) => {
  const parsedHeroId = Number(id);
  const parsedPage = page === undefined ? 1 : Number(page);
  const parsedPageSize = pageSize === undefined ? 10 : Number(pageSize);
  const offset = (parsedPage - 1) * parsedPageSize;

  if (!Number.isInteger(parsedHeroId) || parsedHeroId <= 0) {
    throw makeError("Hero id must be a positive integer", "VALIDATION_ERROR");
  }
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

  const hero = await Hero.findByPk(parsedHeroId);
  if (!hero) throw makeError("hero with that id doesn't exist", "NOT_FOUND");

  const rows = await Incident.findAll({
    where: {
      hero_id: parsedHeroId,
    },
    attributes: [
      "id",
      "location",
      "level",
      "status",
      "hero_id",
      "assigned_at",
      "created_at",
    ],
    order: [["assigned_at", "DESC"]],
    limit: parsedPageSize,
    offset: offset,
  });

  return {
    data: rows.map(toIncidentHistoryDTO),
    count: rows.length,
    page: parsedPage,
    pageSize: parsedPageSize,
  };
};

export default { findAll, findById, create, updateById, getIncidentHistory };
