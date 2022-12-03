const router = require("express").Router();

const { checkUser } = require("../controllers/loginController");

router.route("/").post(checkUser);

module.exports = router;
