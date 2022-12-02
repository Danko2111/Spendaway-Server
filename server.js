const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const saltRounds = 6;
require("dotenv").config(); //load .env variables
const JWT_SECRET = process.env.SECRET;
const PORT = process.env.PORT || 9000;
const authorize = require("./utils/authorize");
const userRoutes = require("./routes/userRoute");
const transactionRoutes = require("./routes/transactionRoute");

// middleware
app.use(cors());
app.use(express.json());

//user sign up route
app.post("/signup", (req, res) => {
  // validating incomming req.body data
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send(
        "Please make sure the incoming body contains ONLY username and password values"
      );
  } else {
    const { username, password } = req.body;
    // hasing incoming password for security
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
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
  }
});

//user login route
app.post("/login", (req, res) => {
  //req.body validation
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send(
        "Please make sure the incoming body contains ONLY username and password values"
      );
  } else {
    const { username, password } = req.body;
    //searching db for user by username
    knex("user")
      .where("username", username)
      .then(({ data }) => {
        console.log(data);
        //if username exists compare user pass to incoming req.body.pass
        if (bcrypt.compareSync(password, data.password)) {
          //sign a jwt token with a payload and a signature
          let token = jwt.sign(
            {
              user_id: data.user_id,
              username: data.username,
              balance: data.balance,
            },
            JWT_SECRET
          );
          res.status(200).json({ token: token });
        } else {
          res.status(403).send({ token: null });
        }
      })
      .catch((err) => {
        res.status(400).send(`Invalid username ${err}`);
      });
  }
});

// protected routes
//app.use("/users", authorize, userRoutes);
app.use("/transactions", authorize, transactionRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
