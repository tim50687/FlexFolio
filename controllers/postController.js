const { upLoadFile, getFileStream } = require("../s3"); // for post's picture update
// file system
const fs = require("fs");
const utils = require("util");
const unlinkFile = utils.promisify(fs.unlink);

// Create a new post
// User has to create a post with the picture
const createPost = (promisePool) => async (req, res) => {
  try {
    const { group_name, caption } = req.body;
    const { user_email } = req.user;

    // First, check if the group exists
    const [groupExistence] = await promisePool.execute(
      "SELECT 1 FROM workout_group WHERE group_name = ?",
      [group_name]
    );

    if (groupExistence.length === 0) {
      return res.status(404).json({ message: "Group does not exist" });
    }

    // return by multer middleware
    const file = req.file; // filename and path will be used by s3

    // upload the file to s3
    const result = await upLoadFile(file); // need the Key return by s3 to get the image
    const post_image_url = `/images/${result.Key}`;

    // Call the stored procedure
    await promisePool.execute("CALL create_post(?, ?, ?, ?)", [
      user_email,
      group_name,
      caption,
      post_image_url,
    ]);

    // delete the file from uploads folder, since it is already uploaded to s3
    await unlinkFile(file.path);

    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post
const deletePost = (promisePool) => async (req, res) => {
  try {
    const { postId } = req.body;
    const { user_email } = req.user;

    // Call the stored procedure
    const [result] = await promisePool.execute("CALL delete_post(?, ?)", [
      parseInt(postId, 10),
      user_email,
    ]);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Post not found or user not authorized" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Make a comment on a post
const commentOnPost = (promisePool) => async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const { user_email } = req.user;

    // Call the stored procedure
    await promisePool.execute("CALL comment_on_post(?, ?, ?)", [
      parseInt(postId, 10),
      user_email,
      comment,
    ]);

    res.status(201).json({ message: "Commented on post successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a post
const likePost = (promisePool) => async (req, res) => {
  try {
    const { postId } = req.body;
    const { user_email } = req.user;

    // First, check if the user already liked the post
    const [likes] = await promisePool.execute(
      "SELECT 1 FROM user_likes_post WHERE post_id = ? AND user_email = ?",
      [postId, user_email]
    );

    if (likes.length > 0) {
      // User already liked the post, so remove the like
      await promisePool.execute(
        "DELETE FROM user_likes_post WHERE post_id = ? AND user_email = ?",
        [postId, user_email]
      );
      res.status(200).json({ message: "Like removed" });
    } else {
      // User hasn't liked the post yet, so add a like
      await promisePool.execute("CALL like_post(?, ?)", [
        parseInt(postId, 10), // Convert postId to an integer
        user_email,
      ]);
      res.status(201).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPost, deletePost, commentOnPost, likePost };
