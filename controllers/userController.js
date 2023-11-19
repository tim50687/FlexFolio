// Purpose: To handle all user related requests
require("dotenv").config();

const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const { upLoadFile, getFileStream } = require("../s3"); // for user profile picture update
// file system
const fs = require("fs");
const utils = require("util");
const unlinkFile = utils.promisify(fs.unlink);

// User registration
const registerUser = (promisePool) => async (req, res) => {
  try {
    const { email, password, name } = req.body;

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

// User login
const loginUser = (promisePool) => async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the stored procedure
    const [users] = await promisePool.execute(
      "SELECT * FROM app_user WHERE user_email = (?)",
      [email]
    );
    const user = users[0];

    console.log(user);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const passwordValid = await bcrypt.compare(password, user.user_password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.status(200).json({ accessToekn: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user
const deleteUser = (promisePool) => async (req, res) => {
  try {
    console.log(req.user);
    const { user_email } = req.user;
    console.log(user_email);
    // Call the stored procedure
    const [rows] = await promisePool.execute(
      "DELETE FROM app_user WHERE user_email = (?)",
      [user_email]
    );

    // Check if any rows were affected
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle the response based on your stored procedure
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Change user's name
const changeName = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user;
    const { name } = req.body;

    // update the user's name
    const [rows] = await promisePool.execute(
      "UPDATE app_user SET user_name = (?) WHERE user_email = (?)",
      [name, user_email]
    );

    res.status(200).json({ message: "Name changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Set up || Update user's profile picture
const handleHeadshot = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user.user_email;

    // return by multer middleware
    const { headshot } = req.file; // filename and path will be used by s3

    // upload the file to s3
    const result = await upLoadFile(headshot); // need the Key return by s3 to get the image
    const headshotUrl = `/images/${result.Key}`;

    // Update database
    // Check if the user already has a headshot
    const [rows] = await promisePool.execute(
      "SELECT * FROM headshot WHERE user_email = ?",
      [user_email]
    );

    if (rows.length > 0) {
      // Update existing headshot
      await promisePool.execute(
        "UPDATE headshot SET image_url = ?, date_uploaded = NOW() WHERE user_email = ?",
        [headshotUrl, user_email]
      );
    } else {
      // Insert new headshot
      await promisePool.execute(
        "INSERT INTO headshot (user_email, image_url, date_uploaded) VALUES (?, ?, NOW())",
        [user_email, headshotUrl]
      );
    }

    // delete the file from uploads folder, since it is already uploaded to s3
    await unlinkFile(headshot.path);

    res
      .status(200)
      .json({ message: "Profile picture updated successfully", headshotUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  changeName,
  handleHeadshot,
};
