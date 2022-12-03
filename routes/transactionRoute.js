const router = require("express").Router();

const {
  getAllTransactions,
  addNewTransaction,
} = require("../controllers/transactionController");

router.route("/").get(getAllTransactions).post(addNewTransaction);

module.exports = router;
