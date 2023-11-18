const express = require("express");
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

  return router;
};
