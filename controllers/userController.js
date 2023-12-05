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

    // set up the default profile picture
    const headshotUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    // Update user photo
    await promisePool.execute(
      "UPDATE app_user SET user_photo_url = ? WHERE user_email = ?",
      [headshotUrl, email]
    );

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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Handle the response based on your stored procedure
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Change user's name
const updateProfile = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user;
    const { username, user_photo_url } = req.body;

    // Update database

    // Update user photo if provided
    if (user_photo_url && user_photo_url !== "") {
      // Extract the key part from the URL
      const imageKey = user_photo_url.split("/").pop();
      const imageKeyPath = `api/users/images/${imageKey}`;

      await promisePool.execute(
        "UPDATE app_user SET user_photo_url = ? WHERE user_email = ?",
        [imageKeyPath, user_email]
      );
    }

    // Update username if provided
    if (username && username !== "") {
      await promisePool.execute(
        "UPDATE app_user SET user_name = ? WHERE user_email = ?",
        [username, user_email]
      );
    }

    // Call the stored procedure
    const [users] = await promisePool.execute(
      "SELECT * FROM app_user WHERE user_email = (?)",
      [user_email]
    );
    const user = users[0];

    // hide the hash password
    const { user_password: pass, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
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

// get back the user's profile picture
const getHeadshot = (promisePool) => async (req, res) => {
  try {
    // get the image from s3
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
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
  updateProfile,
  handleHeadshot,
  logWorkout,
  getHeadshot,
};
