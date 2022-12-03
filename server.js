const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); //load .env variables
const PORT = process.env.PORT || 9000;
const authorize = require("./utils/authorize");
//const userRoutes = require("./routes/userRoute");
const transactionRoutes = require("./routes/transactionRoute");
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");

// middleware
app.use(cors());
app.use(express.json());

//user sign up route
app.use("/signup", signupRoute);

//user login route
app.use("/login", loginRoute);

// protected routes

//app.use("/users", authorize, userRoutes);
app.use("/transactions", authorize, transactionRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
