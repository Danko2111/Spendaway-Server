const knex = require("knex")(require("../knexfile"));

exports.getUser = (req, res) => {
  knex("user")
    .where("user_id", req.user.user_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateBalance = (req, res) => {
  knex("user")
    .where("user_id", req.user.user_id)
    .update({ balance: req.body.balance })
    .then((data) => {
      res.status(200).send(`Success ${data}`);
    })
    .catch((err) => {
      res.status(500);
    });
};
