import db from "../db.js";

const findAll = async ({ level, status } = {}) => {
  const query = db("incidents")
    .select("id", "location", "level", "status", "hero_id", "created_at")
    .orderBy("id");

  if (level != null && level !== "") {
    query.where("level", level);
  }
  if (status != null && status !== "") {
    query.where("status", status);
  }

  return query;
};

const findById = async (id) => {
  const query = await db("incidents")
    .select("id", "location", "level", "status", "hero_id", "created_at")
    .where("id", id)
    .first();

  return query || null;
};

const create = async ({ location, level, status }) => {
  return db.transaction(async (trx) => {
    const [incydent] = await trx("incidents")
      .insert({ location: location, level: level, status: status })
      .returning([
        "id",
        "location",
        "level",
        "status",
        "hero_id",
        "created_at",
      ]);

    return incydent;
  });
};

const assignNewHero = async ({ incidentId, heroId }) => {
  return db.transaction(async (trx) => {
    const [incident] = await trx("incidents")
      .where("id", incidentId)
      .update({ hero_id: heroId })
      .returning([
        "id",
        "location",
        "level",
        "status",
        "hero_id",
        "created_at",
      ]);

    return incident ?? null;
  });
};

const closeIncident = async (id) => {
  return db.transaction(async (trx) => {
    const [incident] = await trx("incidents")
      .where("id", id)
      .update({ status: "resolved" })
      .returning([
        "id",
        "location",
        "level",
        "status",
        "hero_id",
        "created_at",
      ]);

    return incident ?? null;
  });
};

export default { findAll, findById, create, assignNewHero, closeIncident };
