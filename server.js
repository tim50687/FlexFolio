const express = require("express");
const app = express(); // create express app
const PORT = 3000; // port where server is running

// Set up environment variables
const dotenv = require("dotenv");
dotenv.config();

// Set up sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Check databse connection (Promise-based approach)
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, Flexfolio");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
