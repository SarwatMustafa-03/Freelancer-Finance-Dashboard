
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const {
  createTransaction,
  getTransaction,
  getById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

// Protected routes
router.post("/", auth, createTransaction);
router.get("/", auth, getTransaction);
router.get("/:id", auth, getById);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

module.exports = router;