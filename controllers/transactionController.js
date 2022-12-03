const knex = require("knex")(require("../knexfile"));

exports.getAllTransactions = (req, res) => {
  knex("transaction")
    .where("user_id", req.decoded.user_id)
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.statsu(400).send(err);
    });
};

exports.addNewTransaction = (req, res) => {
  knex("transaction")
    .insert(req.body)
    .then((data) => {
      res.status(200).send(`New transaction added`);
    })
    .catch((err) => {
      res.status(400).send(`Could not add new transaction ${err}`);
    });
};
