import { pool } from "../db.js";

const findAll = async ({ level, status } = {}) => {
  const { rows } = await pool.query(
    `SELECT id, lokalizacja, poziom, status, bohater_id, created_at
	FROM incydenty
	WHERE ($1::text IS NULL OR poziom::text = $1)
	AND ($2::text IS NULL OR status::text = $2)
	ORDER BY id`,
    [level ?? null, status ?? null],
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, lokalizacja, poziom, status, bohater_id, created_at
	FROM incydenty
	WHERE id = $1`,
    [id],
  );
  return rows[0] || null;
};

const create = async ({ location, level, status }) => {
  console.log(location, level, status);
  const { rows } = await pool.query(
    `INSERT INTO incydenty (lokalizacja, poziom, status)
		 VALUES ($1, $2, $3)
		 RETURNING id, lokalizacja, poziom, status, bohater_id, created_at`,
    [location, level, status],
  );
  return rows[0];
};

const assignNewHero = async ({ incidentId, heroId }) => {
  const { rows } = await pool.query(
    `UPDATE incydenty
	SET bohater_id = $2
    WHERE id = $1
	RETURNING id, lokalizacja, poziom, status, bohater_id, created_at`,
    [incidentId, heroId],
  );
  return rows[0] || null;
};

const closeIncident = async (id) => {
  const { rows } = await pool.query(
    `UPDATE incydenty
	SET status = 'zakończony'
	WHERE id = $1
	RETURNING id, lokalizacja, poziom, status, bohater_id, created_at`,
    [id],
  );
  return rows[0] || null;
};

export default { findAll, findById, create, assignNewHero, closeIncident };
