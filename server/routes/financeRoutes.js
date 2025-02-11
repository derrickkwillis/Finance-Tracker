const express = require("express");
const pool = require("../database/db");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

router.get("/cash-flow", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Calculate total income
    const incomeResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE user_id = $1 AND type = 'income'",
      [userId]
    );

    // Calculate total expenses
    const expensesResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_expenses FROM transactions WHERE user_id = $1 AND type = 'expense'",
      [userId]
    );

    const totalIncome = parseFloat(incomeResult.rows[0].total_income);
    const totalExpenses = parseFloat(expensesResult.rows[0].total_expenses);
    const netBalance = totalIncome - totalExpenses;

    res.json({ totalIncome, totalExpenses, netBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(transactions.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/transactions", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, category, type } = req.body;

    if (!amount || !category || !["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const newTransaction = await pool.query(
      "INSERT INTO transactions (user_id, amount, category, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, amount, category, type]
    );

    res.status(201).json(newTransaction.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/savings-trend", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const savingsTrend = await pool.query(
      "SELECT month_year, balance FROM balance WHERE user_id = $1 ORDER BY month_year DESC LIMIT 6",
      [userId]
    );

    res.json(savingsTrend.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/balance", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const balance = await pool.query(
      "SELECT month_year, balance FROM balance WHERE user_id = $1 ORDER BY month_year DESC LIMIT 1",
      [userId]
    );

    res.json(balance.rows[0] || { balance: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/savings", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { goal_name, target_amount, percentage, interval } = req.body;

    if (
      !goal_name ||
      !percentage ||
      !["weekly", "monthly", "yearly"].includes(interval)
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const newSavingsPlan = await pool.query(
      "INSERT INTO savings (user_id, goal_name, target_amount, percentage, interval) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, goal_name, target_amount, percentage, interval]
    );

    res.status(201).json(newSavingsPlan.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/savings", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const savingsPlans = await pool.query(
      "SELECT * FROM savings WHERE user_id = $1 ORDER BY last_saved DESC",
      [userId]
    );

    res.json(savingsPlans.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/transactions/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { amount, category, type } = req.body;

    const updatedTransaction = await pool.query(
      "UPDATE transactions SET amount = $1, category = $2, type = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [amount, category, type, id, userId]
    );

    if (updatedTransaction.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/transactions/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedTransaction = await pool.query(
      "DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletedTransaction.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/savings/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedSavings = await pool.query(
      "DELETE FROM savings WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletedSavings.rows.length === 0) {
      return res.status(404).json({ error: "Savings plan not found" });
    }

    res.json({ message: "Savings plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
