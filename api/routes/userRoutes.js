const express = require("express");
// image upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

module.exports = (promisePool) => {
  const router = express.Router();

  // Pass the promisePool to the controller function
  router.post("/register", userController.registerUser(promisePool));

  // Add login route
  router.post("/login", userController.loginUser(promisePool));

  // Delete user route
  router.delete(
    "/delete-account",
    authenticateToken,
    userController.deleteUser(promisePool)
  );

  // Update user profile
  router.put(
    "/update-profile",
    authenticateToken,
    userController.updateProfile(promisePool)
  );

  // Update user's profile picture
  router.post(
    "/update-profile-picture",
    authenticateToken,
    upload.single("headshot"),
    userController.handleHeadshot(promisePool)
  );

  // Log the workout
  router.post(
    "/log-workout",
    authenticateToken,
    userController.logWorkout(promisePool)
  );

  // Get user's profile picture
  router.get(
    "/images/:key",
    authenticateToken,
    userController.getHeadshot(promisePool)
  );

  // Get user's workout logs
  router.get(
    "/workout-logs",
    authenticateToken,
    userController.getWorkouts(promisePool)
  );

  // Delete user's workout
  router.delete(
    "/delete-workout/:workout_id",
    authenticateToken,
    userController.deleteWorkout(promisePool)
  );

  return router;
};
