const knex = require("knex")(require("../knexfile"));

exports.getMonthTransactions = (req, res) => {
  knex("transaction")
    .where("user_id", req.user.user_id)
    .andWhereBetween("date", [req.query.startDate, req.query.endDate])
    .orderBy("date")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
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
