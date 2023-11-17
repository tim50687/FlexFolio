const express = require("express");
const mysql = require("mysql2"); // mysql2 is a promise-based version of mysql

// Set up environment variables
const dotenv = require("dotenv");
dotenv.config();

// Set up connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

// Test database connection
promisePool
  .getConnection()
  .then((conn) => {
    console.log("Database connection established");
    conn.release(); // Release to the pool
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express(); // create express app
const PORT = 3000; // port where server is running

app.use(express.json()); // Middleware for parsing JSON bodies

// Use the user routes and pass the promisePool
const userRoutes = require("./routes/userRoutes"); // Import user routes
app.use("/api/users", userRoutes(promisePool));

app.get("/", (req, res) => {
  res.send("Hello, Flexfolio");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
