import db from "../models/index.js";

const { Heroes: Hero, Incidents: Incident, sequelize } = db;

const toDTO = (row) => ({
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

const findAll = async ({ level, status } = {}) => {
  const where = {};
  if (status != null && status !== "") {
    where.status = status;
  }
  if (level != null && level !== "") {
    where.level = level;
  }
  const rows = await Incident.findAll({
    where,
    order: [["id", "ASC"]],
  });
  return rows.map(toDTO);
};

const findById = async (id) => {
  const row = await Incident.findByPk(id);
  return row ? toDTO(row) : null;
};

const create = async ({ location, level, status }) => {
  if (!location?.trim())
    throw makeError("Location is required", "VALIDATION_ERROR");
  if (!level?.trim()) throw makeError("Level is required", "VALIDATION_ERROR");
  if (!status?.trim())
    throw makeError("Status is required", "VALIDATION_ERROR");

  return sequelize.transaction(async (transaction) => {
    const row = await Incident.create(
      { location: location.trim(), level: level.trim(), status },
      { transaction },
    );

    return toDTO(row);
  });
};

const assignNewHero = async ({ incidentId, heroId }) => {
  const parsedIncidentId = Number(incidentId);
  const parsedHeroId = Number(heroId);
  if (!Number.isInteger(parsedIncidentId) || parsedIncidentId <= 0) {
    throw makeError(
      "Incident id must be a positive integer",
      "VALIDATION_ERROR",
    );
  }
  if (!Number.isInteger(parsedHeroId) || parsedHeroId <= 0) {
    throw makeError("Hero id must be a positive integer", "VALIDATION_ERROR");
  }

  return sequelize.transaction(async (transaction) => {
    const incident = await Incident.findByPk(parsedIncidentId, { transaction });
    if (!incident)
      throw makeError("incident with that id doesn't exist", "NOT_FOUND");
    if (incident.hero_id !== null) {
      throw makeError("incident has already assigned hero", "CONFLICT");
    }

    const hero = await Hero.scope("available").findByPk(parsedHeroId, {
      transaction,
    });
    if (!hero) {
      const heroExists = await Hero.findByPk(parsedHeroId, {
        attributes: ["id"],
        transaction,
      });
      if (!heroExists) {
        throw makeError("hero with that id doesn't exist", "NOT_FOUND");
      }
      throw makeError("hero with that id is currently unavailable", "CONFLICT");
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

    await hero.update({ status: "busy" }, { transaction });

    const row = await incident.update(
      {
        hero_id: parsedHeroId,
        assigned_at: new Date(),
        status: "assigned",
      },
      { transaction },
    );

    return toDTO(row);
  });
};

const closeIncident = async (id) => {
  const parsedIncidentId = Number(id);
  if (!Number.isInteger(parsedIncidentId) || parsedIncidentId <= 0) {
    throw makeError(
      "Incident id must be a positive integer",
      "VALIDATION_ERROR",
    );
  }

  return sequelize.transaction(async (transaction) => {
    const incident = await Incident.findByPk(parsedIncidentId, { transaction });
    if (!incident)
      throw makeError("incident with that id doesn't exist", "NOT_FOUND");

    if (incident.hero_id !== null) {
      await Hero.update(
        { status: "available" },
        { where: { id: incident.hero_id }, transaction },
      );
    }

    const row = await incident.update(
      {
        status: "resolved",
        resolved_at: new Date(),
      },
      { transaction },
    );

    return toDTO(row);
  });
};

export default { findAll, findById, create, assignNewHero, closeIncident };
