const router = require("express").Router();

const { addNewUser } = require("../controllers/signupController");

router.route("/").post(addNewUser);

module.exports = router;
