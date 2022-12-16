const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const saltRounds = 6;

exports.getUser = (req, res) => {
  knex("user")
    .where("user_id", req.user.user_id)
    .then((data) => {
      res.status(200).json({
        user_id: data[0].user_id,
        username: data[0].username,
        balance: data[0].balance,
      });
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

exports.updateUser = (req, res) => {
  const { username, pass } = req.body;
  console.log(username, pass);
  if (username) {
    knex("user")
      .where("username", username)
      .then((data) => {
        if (data[0]?.username !== username) {
          knex("user")
            .where("user_id", req.user.user_id)
            .update(
              pass
                ? {
                    username: username,
                    password: bcrypt.hashSync(pass, saltRounds),
                  }
                : { username: username }
            )
            .then((data) => {
              res.status(200).send(`Success`);
            })
            .catch((err) => {
              console.error("user_id req", err);
              res.status(400);
            });
        } else {
          res.status(205).send("This Username already exists");
        }
      })
      .catch((err) => {
        console.error("username req", err);
      });
  } else {
    knex("user")
      .where("user_id", req.user.user_id)
      .update({ password: bcrypt.hashSync(pass, saltRounds) })
      .then((data) => {
        res.status(200).send(`Success`);
      })
      .catch((err) => {
        res.status(400);
        console.log(err);
      });
  }
};
