const Transaction = require("../models/transaction.model");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const transaction = new Transaction({
      userId: req.user.id,
      amount,
      type,
      category,
      description,
      date,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

// Get all transactions
const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

// Get by ID
const getById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
  success: false,
  message: "Transaction not found"
});
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

// Update
const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
  success: false,
  message: "Transaction not found"
});
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

// Delete
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
  success: false,
  message: "Transaction not found"
});
    }

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};
//getsummary
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    res.json({
      income,
      expense,
      balance: income - expense,
    });

  } catch (error) {
   res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getById,
  updateTransaction,
  deleteTransaction,
  getSummary
};