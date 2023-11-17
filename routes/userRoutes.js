const express = require("express");
const userController = require("../controllers/userController");

module.exports = (promisePool) => {
  const router = express.Router();

  // Pass the promisePool to the controller function
  router.post("/register", userController.registerUser(promisePool));

  return router;
};
