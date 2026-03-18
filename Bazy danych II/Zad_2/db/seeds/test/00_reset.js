export async function seed(knex) {
  await knex.raw("TRUNCATE TABLE incidents, heroes RESTART IDENTITY CASCADE");
}
