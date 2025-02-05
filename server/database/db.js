const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined. Check your .env file.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Render-hosted PostgreSQL
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL on Render");
});

module.exports = pool;
