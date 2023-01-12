const router = require("express").Router();

const {
  getMonthTransactions,
  addNewTransaction,
} = require("../controllers/transactionController");

router.route("/").get(getMonthTransactions).post(addNewTransaction);

module.exports = router;
