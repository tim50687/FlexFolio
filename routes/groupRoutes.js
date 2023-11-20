const express = require("express");
const groupController = require("../controllers/groupController");
const authenticateToken = require("../middleware/authenticateToken");

// image upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (promisePool) => {
  const router = express.Router();
  // Create group
  router.post(
    "/create-group",
    authenticateToken,
    groupController.createGroup(promisePool)
  );
  // Join group
  router.post(
    "/join-group",
    authenticateToken,
    groupController.joinGroup(promisePool)
  );
  // Leave group
  router.delete(
    "/leave-group",
    authenticateToken,
    groupController.leaveGroup(promisePool)
  );

  // Set up group picture
  router.post(
    "/update-group-picture",
    authenticateToken,
    upload.single("groupPicture"),
    groupController.handleGroupPicture(promisePool)
  );
  return router;
};
