/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transaction", (table) => {
    table.uuid("transaction_id").primary();
    table.string("name").notNullable();
    table.string("category").notNullable();
    table.float("amount").notNullable();
    table.bigInteger("date").notNullable();
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
exports.down = function (knex) {
  return knex.schema.dropTable("transaction");
};
