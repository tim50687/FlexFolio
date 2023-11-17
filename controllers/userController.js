// Purpose: To handle all user related requests

const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const registerUser = (promisePool) => async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name); // Add this line for debugging

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the stored procedure
    const [rows] = await promisePool.execute("CALL create_user(?, ?, ?)", [
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
module.exports = { registerUser };
