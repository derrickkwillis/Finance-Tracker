const cron = require("node-cron");
const pool = require("../database/db");

const processSavingsDeductions = async () => {
  try {
    const savingsPlans = await pool.query("SELECT * FROM savings");

    for (let plan of savingsPlans.rows) {
      const {
        user_id,
        id: savings_id,
        percentage,
        interval,
        last_saved,
      } = plan;

      const balanceResult = await pool.query(
        "SELECT balance FROM balance WHERE user_id = $1 ORDER BY month_year DESC LIMIT 1",
        [user_id]
      );

      if (balanceResult.rows.length === 0) continue;

      let currentBalance = parseFloat(balanceResult.rows[0].balance);
      let amountToSave = (percentage / 100) * currentBalance;

      if (amountToSave > 0) {
        let newBalance = currentBalance - amountToSave;

        await pool.query(
          "UPDATE balance SET balance = $1 WHERE user_id = $2 AND month_year = (SELECT MAX(month_year) FROM balance WHERE user_id = $2)",
          [newBalance, user_id]
        );

        await pool.query(
          "INSERT INTO transactions (user_id, amount, category, type) VALUES ($1, $2, 'Savings Contribution', 'expense')",
          [user_id, amountToSave]
        );

        await pool.query(
          "UPDATE savings SET last_saved = CURRENT_TIMESTAMP WHERE id = $1",
          [savings_id]
        );

        console.log(`Auto-saved $${amountToSave} for user ${user_id}`);
      }
    }
  } catch (error) {
    console.error("Error processing savings deductions:", error.message);
  }
};

cron.schedule("0 0 * * *", () => {
  console.log("Running auto-savings job...");
  processSavingsDeductions();
});

module.exports = processSavingsDeductions;
