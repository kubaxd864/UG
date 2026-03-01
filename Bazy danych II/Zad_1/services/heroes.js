import heroRepository from "../repositories/heroes.js";

const toDTO = (row) => ({
  id: row.id,
  name: row.imie,
  power: row.moc,
  status: row.status,
  createdAt: row.created_at.toISOString(),
});

const makeError = (message, code) => {
  const err = new Error(message);
  err.code = code;
  return err;
};

const findAll = async ({ status, power } = {}) => {
  const rows = await heroRepository.findAll({ status, power });
  return rows.map(toDTO);
};

const findById = async (id) => {
  const row = await heroRepository.findById(id);
  return row ? toDTO(row) : null;
};

const create = async ({ name, power, status }) => {
  if (!name?.trim()) throw makeError("Name is required", "VALIDATION_ERROR");
  if (!power?.trim()) throw makeError("Power is required", "VALIDATION_ERROR");
  if (
    !["lot", "siła", "telepatia", "szybkość", "niewidzialność"].includes(power)
  )
    throw makeError(
      "Power don't match the options avaliable",
      "VALIDATION_ERROR",
    );
  if (!["dostępny", "w misji", "niedostępny", "odpoczywa"].includes(status))
    throw makeError(
      "Status must be 'dostępny' or 'w misji' or 'niedostępny' or 'odpoczywa'",
      "VALIDATION_ERROR",
    );
  const existing = await heroRepository.findByName(name);
  if (existing) throw makeError("This Name already assigned", "CONFLICT");
  const row = await heroRepository.create({
    name: name.trim(),
    power: power.trim(),
    status,
  });
  return toDTO(row);
};

export default { findAll, findById, create };
