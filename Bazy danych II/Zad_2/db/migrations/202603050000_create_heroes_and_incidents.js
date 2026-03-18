export async function up(knex) {
  await knex.schema.createTable("heroes", (table) => {
    table.increments("id").primary();
    table.string("name", 120).notNullable().unique();
    table
      .enu(
        "power",
        ["flight", "strength", "telepathy", "speed", "invisibility"],
        {
          useNative: true,
          enumName: "hero_power",
        },
      )
      .notNullable();
    table
      .enu("status", ["available", "busy", "retired"], {
        useNative: true,
        enumName: "hero_status",
      })
      .notNullable()
      .defaultTo("available");
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("incidents", (table) => {
    table.increments("id").primary();
    table.string("location", 180).notNullable();
    table
      .enu("level", ["low", "medium", "critical"], {
        useNative: true,
        enumName: "incident_level",
      })
      .notNullable();
    table
      .enu("status", ["open", "assigned", "resolved"], {
        useNative: true,
        enumName: "incident_status",
      })
      .notNullable()
      .defaultTo("open");
    table
      .integer("hero_id")
      .references("id")
      .inTable("heroes")
      .onDelete("SET NULL")
      .index();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("incidents");
  await knex.schema.dropTableIfExists("heroes");

  await knex.raw("DROP TYPE IF EXISTS incident_status");
  await knex.raw("DROP TYPE IF EXISTS incident_level");
  await knex.raw("DROP TYPE IF EXISTS hero_status");
  await knex.raw("DROP TYPE IF EXISTS hero_power");
}
