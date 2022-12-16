const router = require("express").Router();

const {
  getUser,
  updateBalance,
  updateUser,
} = require("../controllers/userController");

router.route("/").get(getUser).put(updateBalance);

router.route("/update-user").put(updateUser);

module.exports = router;
