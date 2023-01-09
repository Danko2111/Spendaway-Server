/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("budget", (table) => {
    table.uuid("budget_id").primary();
    table.float("housing").notNullable();
    table.float("utilities").notNullable();
    table.float("personal").notNullable();
    table.float("misc").notNullable();
    table.float("entertainment").notNullable();
    table.float("transportation").notNullable();
    table.float("food").notNullable();
    table
      .uuid("user_id")
      .notNullable()
      .references("user_id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
