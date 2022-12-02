const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  //isolate the incomming token from the bearer string
  const token = req.headers.authorization.split(" ")[1];
  //verify token
  if (token && jwt.verify(token, JWT_SECRET)) {
    req.user = jwt.decode(token);
    next();
  } else {
    res.status(400).send("Invalid or Undefined Token");
  }
};
