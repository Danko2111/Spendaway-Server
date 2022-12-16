const router = require("express").Router();

const { getUser, updateBalance } = require("../controllers/userController");

router.route("/").get(getUser).put(updateBalance);

module.exports = router;
