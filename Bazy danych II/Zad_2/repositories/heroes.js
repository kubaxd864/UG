import db from "../db.js";

const findAll = async ({ status, power } = {}) => {
  const query = db("heroes")
    .select("id", "name", "power", "status", "created_at")
    .orderBy("id");

  if (status != null) {
    query.where("status", status);
  }
  if (power != null) {
    query.where("power", power);
  }

  return query;
};

const findById = async (id) => {
  const query = db("heroes")
    .select("id", "name", "power", "status", "created_at")
    .where("id", id)
    .first();

  return query || null;
};

const findByName = async (name) => {
  const query = db("heroes").select("id").where("name", name).first();
  return query || null;
};

const create = async ({ name, power, status }) => {
  return db.transaction(async (trx) => {
    const [hero] = await trx("heroes")
      .insert({ name: name, power: power, status })
      .returning(["id", "name", "power", "status", "created_at"]);

    return hero;
  });
};

const updateById = async ({ id, name, power, status }) => {
  return db.transaction(async (trx) => {
    const patch = {};
    if (name !== undefined) patch.name = name;
    if (power !== undefined) patch.power = power;
    if (status !== undefined) patch.status = status;

    if (Object.keys(patch).length === 0) {
      const hero = await trx("heroes")
        .select("id", "name", "power", "status", "created_at")
        .where("id", id)
        .first();

      return hero ?? null;
    }
  });
};

const findIncidentsByHeroId = async ({ heroId, limit, offset }) => {
  const query = db("incidents")
    .select(
      "id",
      "location",
      "level",
      "status",
      "hero_id",
      "assigned_at",
      "created_at",
    )
    .where("hero_id", heroId)
    .orderBy("assigned_at", "desc")
    .limit(limit)
    .offset(offset);

  return query;
};

export default {
  findAll,
  findById,
  findByName,
  create,
  updateById,
  findIncidentsByHeroId,
};
