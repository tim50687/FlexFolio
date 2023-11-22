const express = require("express");
// image upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const postController = require("../controllers/postController");
const authenticateToken = require("../middleware/authenticateToken");

module.exports = (promisePool) => {
  const router = express.Router();

  // Create a new post
  router.post(
    "/create-post",
    authenticateToken,
    upload.single("postPicture"),
    postController.createPost(promisePool)
  );

  // Delete a post
  router.delete(
    "/delete-post",
    authenticateToken,
    postController.deletePost(promisePool)
  );

  return router;
};
