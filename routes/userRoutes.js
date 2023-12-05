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

  // Change user's name
  router.put(
    "/change-name",
    authenticateToken,
    userController.changeName(promisePool)
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

  return router;
};
