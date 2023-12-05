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
      res.status(409).json({ success: false, message: "User already exists" });
    }
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
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
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Check if password is correct
    const passwordValid = await bcrypt.compare(password, user.user_password);
    if (!passwordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credential" });
    }

    // Generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET);

    // hide the hash password
    const { user_password: pass, ...userWithoutPassword } = user;
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
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
    const { user_email } = req.user;
    console.log(req.user);
    // return by multer middleware
    const file = req.file; // filename and path will be used by s3

    // upload the file to s3
    const result = await upLoadFile(file); // need the Key return by s3 to get the image
    console.log(result);
    const headshotUrl = `/images/${result.Key}`;
    // Update database

    // Update user photo
    await promisePool.execute(
      "UPDATE app_user SET user_photo_url = ? WHERE user_email = ?",
      [headshotUrl, user_email]
    );

    // delete the file from uploads folder, since it is already uploaded to s3
    await unlinkFile(file.path);

    res
      .status(200)
      .json({ message: "Profile picture updated successfully", headshotUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Log the workout
const logWorkout = (promisePool) => async (req, res) => {
  try {
    const { exerciseName, sets, reps, weight } = req.body;
    const { user_email } = req.user;

    // Call the stored procedure with the new weight parameter
    await promisePool.execute("CALL log_workout(?, ?, ?, ?, ?)", [
      user_email,
      exerciseName,
      sets,
      reps,
      weight, // New weight parameter
    ]);
    res.status(201).json({ message: "Workout logged successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  changeName,
  handleHeadshot,
  logWorkout,
};
