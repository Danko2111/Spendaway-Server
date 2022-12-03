const router = require("express").Router();

const {
  getAllTransactions,
  addTransaction,
} = require("../controllers/transactionController");

router.route("/").get(getAllTransactions);

module.exports = router;
