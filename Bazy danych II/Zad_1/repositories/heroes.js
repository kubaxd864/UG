import { pool } from "../db.js";

const findAll = async ({ status, power } = {}) => {
  const { rows } = await pool.query(
    `SELECT id, imie, moc, status, created_at
       FROM bohaterowie
      WHERE ($1::status_bohatera_enum IS NULL OR status = $1::status_bohatera_enum)
        AND ($2::moc_enum IS NULL OR moc = $2::moc_enum)
      ORDER BY id`,
    [status, power],
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, imie, moc, status, created_at FROM bohaterowie WHERE id = $1",
    [id],
  );
  return rows[0] || null;
};

const findByName = async (name) => {
  const { rows } = await pool.query(
    "SELECT id FROM bohaterowie WHERE imie = $1",
    [name],
  );
  return rows[0] || null;
};

const create = async ({ name, power, status }) => {
  const { rows } = await pool.query(
    `INSERT INTO bohaterowie (imie, moc, status)
     VALUES ($1, $2, $3)
     RETURNING id, imie, moc, status, created_at`,
    [name, power, status],
  );
  return rows[0];
};

export default { findAll, findById, findByName, create };
