export async function up(knex) {
  await knex.schema.alterTable("incidents", (table) => {
    table.string("district", 100);
    table.timestamp("assigned_at", { useTz: true });
    table.timestamp("resolved_at", { useTz: true });
  });

  await knex.schema.alterTable("heroes", (table) => {
    table.integer("missions_count").notNullable().defaultTo(0);
  });
}

export async function down(knex) {
  await knex.schema.alterTable("incidents", (table) => {
    table.dropColumn("district");
    table.dropColumn("assigned_at");
    table.dropColumn("resolved_at");
  });

  await knex.schema.alterTable("heroes", (table) => {
    table.dropColumn("missions_count");
  });
}
