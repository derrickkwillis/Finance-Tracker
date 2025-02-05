require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import database connection
const pool = require("./database/db");

// Import API Routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Root Route (Basic API Check)
app.get("/", (req, res) => {
  res.send("Finance Tracker API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
