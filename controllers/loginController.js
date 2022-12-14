const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.SECRET;

exports.checkUser = (req, res) => {
  //req.body validation
  if (!req.body.username || !req.body.pass) {
    res
      .status(401)
      .send(
        "Please make sure the incoming body contains ONLY username and password values"
      );
  } else {
    const { username, pass } = req.body;
    //searching db for user by username
    knex("user")
      .where("username", username)
      .then((data) => {
        if (data[0]?.username !== username) {
          res.status(202).send("user not found");
        } else {
          const { user_id, password } = data[0];
          //if username exists compare user pass to incoming req.body.pass
          let hash = password;
          if (bcrypt.compareSync(pass, hash)) {
            //sign a jwt token with a payload and a signature
            let token = jwt.sign(
              {
                user_id: user_id,
              },
              JWT_SECRET
            );
            res.status(200).json({ token: token });
          } else {
            res
              .status(203)
              .send({ message: "Incorrect Passsword", token: null });
          }
        }
      })
      .catch((err) => {
        res.status(400).send(`Error fetching user from DB ${err}`);
      });
  }
};
