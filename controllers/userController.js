// Purpose: To handle all user related requests

const bcrypt = require("bcrypt");
const mysql = require("mysql2");

// Set up connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the stored procedure
    const [rows] = await promisePool.execute("CALL register(?, ?, ?)", [
      email,
      hashedPassword,
      name,
    ]);

    // Handle the response based on your stored procedure
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "User already exists" });
    }
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { register };
