const pool = require("./db");

async function testDBConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database Connected. Current Timestamp:", result.rows[0]);
  } catch (err) {
    console.error("Database Connection Failed:", err.message);
  } finally {
    pool.end(); // Close the connection
  }
}

testDBConnection();
