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

  // Comment on a post
  router.post(
    "/comment",
    authenticateToken,
    postController.commentOnPost(promisePool)
  );

  // Like a post
  router.post("/like", authenticateToken, postController.likePost(promisePool));

  // Set the post picture
  router.post(
    "/update-post-picture",
    authenticateToken,
    upload.single("postPicture"),
    postController.handlePostPicture(promisePool)
  );

  // Get post picture
  router.get(
    "/images/:key",
    authenticateToken,
    postController.getPostPicture(promisePool)
  );

  // Get all posts under a group
  router.get(
    "/:group_name",
    authenticateToken,
    postController.getPostsByGroup(promisePool)
  );

  return router;
};
