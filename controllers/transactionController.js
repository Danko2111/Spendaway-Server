const knex = require("knex")(require("../knexfile"));

exports.getAllTransactions = (req, res) => {
  knex("transactions")
    .where("user_id", req.decoded.user_id)
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.statsu(400).send(err);
    });
};
