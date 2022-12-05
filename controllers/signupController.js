const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const saltRounds = 6;
const { v4: uuid } = require("uuid");

exports.addNewUser = (req, res) => {
  // validating incomming req.body data
  if (!req.body.username || !req.body.pass) {
    res
      .status(400)
      .send(
        "Please make sure the incoming body contains ONLY username and password values"
      );
  } else {
    const { username, pass } = req.body;
    // check DB for existing usernames to disallow duplicate users
    knex("user")
      .where("username", username)
      .then((data) => {
        if (data[0].username === username) {
          res.status(205).send("This Username already exists");
        }
      })
      .catch((err) => {
        // hasing incoming password for security
        const hashedPassword = bcrypt.hashSync(pass, saltRounds);
        // creating a newUser object
        const newUser = {
          user_id: uuid(),
          username: username,
          password: hashedPassword,
        };
        // inserting new user data into DB
        knex("user")
          .insert(newUser)
          .then((data) => {
            res.status(200).send("Successfully added new user to DB");
          })
          .catch((err) => {
            res.status(400).send(`Error inserting new user ${err}`);
          });
      });
  }
};
