import incidentRepository from "../repositories/incidents.js";
import heroRepository from "../repositories/heroes.js";

const toDTO = (row) => ({
  id: row.id,
  location: row.lokalizacja,
  level: row.poziom,
  status: row.status,
  heroId: row.bohater_id,
  createdAt: row.created_at.toISOString(),
});

const makeError = (message, code) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

const findAll = async ({ level, status } = {}) => {
  const rows = await incidentRepository.findAll({ level, status });
  return rows.map(toDTO);
};

const findById = async (id) => {
  const row = await incidentRepository.findById(id);
  return row ? toDTO(row) : null;
};

const create = async ({ location, level, status }) => {
  if (!location?.trim())
    throw makeError("Location is required", "VALIDATION_ERROR");
  if (!level?.trim()) throw makeError("Level is required", "VALIDATION_ERROR");
  if (!status?.trim())
    throw makeError("Status is required", "VALIDATION_ERROR");

  const row = await incidentRepository.create({
    location: location.trim(),
    level: level.trim(),
    status,
  });
  return toDTO(row);
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

  const incident = await incidentRepository.findById(parsedIncidentId);
  if (!incident)
    throw makeError("incident with that id doesn't exist", "NOT_FOUND");
  if (incident.bohater_id !== null) {
    throw makeError("incident has already assigned hero", "CONFLICT");
  }

  const hero = await heroRepository.findById(parsedHeroId);
  if (!hero) throw makeError("hero with that id doesn't exist", "NOT_FOUND");
  if (hero.status !== "dostępny") {
    throw makeError("hero with that id is currently unavaliable", "CONFLICT");
  }

  const isCriticalIncident = ["critical"].includes(
    String(incident.poziom).toLowerCase(),
  );
  if (isCriticalIncident) {
    const allowedPowersForCritical = ["siła", "telepatia"];
    if (!allowedPowersForCritical.includes(hero.moc)) {
      throw makeError(
        "hero power does not meet critical incident requirements",
        "FORBIDDEN",
      );
    }
  }

  const row = await incidentRepository.assignNewHero({
    incidentId: parsedIncidentId,
    heroId: parsedHeroId,
  });
  return toDTO(row);
};

const closeIncident = async (id) => {
  const parsedIncidentId = Number(id);
  if (!Number.isInteger(parsedIncidentId) || parsedIncidentId <= 0) {
    throw makeError(
      "Incident id must be a positive integer",
      "VALIDATION_ERROR",
    );
  }

  const incident = await incidentRepository.findById(parsedIncidentId);
  if (!incident)
    throw makeError("incident with that id doesn't exist", "NOT_FOUND");
  const row = await incidentRepository.closeIncident(parsedIncidentId);
  return toDTO(row);
};

export default { findAll, findById, create, assignNewHero, closeIncident };
