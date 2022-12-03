const userData = require("../seed_data/userData");
const transactionData = require("../seed_data/transactionData");

exports.seed = (knex) => {
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert(userData);
    })
    .then(() => {
      return knex("transaction").del();
    })
    .then(() => {
      return knex("transaction").insert(transactionData);
    });
};
