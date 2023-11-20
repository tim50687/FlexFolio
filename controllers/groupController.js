const { upLoadFile, getFileStream } = require("../s3"); // for user profile picture update
// file system
const fs = require("fs");
const utils = require("util");
const unlinkFile = utils.promisify(fs.unlink);

// Create a new group
const createGroup = (promisePool) => async (req, res) => {
  try {
    const { groupName, description, passcode } = req.body;
    const { user_email } = req.user;

    // Call the stored procedure, passing NULL for groupPhotoUrl
    await promisePool.execute("CALL create_group(?, ?, ?, ?, NULL)", [
      groupName,
      description,
      passcode,
      user_email,
    ]);

    res.status(201).json({ message: "Group created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User join group
const joinGroup = (promisePool) => async (req, res) => {
  try {
    const { groupName, passcode } = req.body;

    const { user_email } = req.user;

    await promisePool.execute("CALL join_group(?, ?, ?)", [
      groupName,
      user_email,
      passcode,
    ]);

    res.status(201).json({ message: "Group joined successfully" });
  } catch (err) {
    console.error(err);

    // Specific error handling for the custom error raised by the stored procedure
    if (
      err.code === "ER_SIGNAL_EXCEPTION" &&
      err.message.includes("Invalid passcode")
    ) {
      return res.status(400).json({ message: "Invalid passcode" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

// Leave group
const leaveGroup = (promisePool) => async (req, res) => {
  try {
    const { groupName } = req.body;

    const { user_email } = req.user;

    // First, check if the user is part of the group
    const [checkResult] = await promisePool.execute(
      "SELECT 1 FROM user_group WHERE user_email = ? AND group_name = ?",
      [user_email, groupName]
    );

    if (checkResult.length === 0) {
      return res.status(404).json({
        message: "User not found in the group or group does not exist",
      });
    }

    // Proceed to delete the user from the group
    await promisePool.execute(
      "DELETE FROM user_group WHERE user_email = ? AND group_name = ?",
      [user_email, groupName]
    );
    res.status(200).json({ message: "Successfully left the workout group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Set up group picture
const handleGroupPicture = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user;
    const { groupName } = req.body;
    // return by multer middleware
    const file = req.file; // filename and path will be used by s3
    console.log(user_email, groupName);
    // Check if the user is a member of the group
    const [group] = await promisePool.execute(
      "SELECT 1 FROM user_group WHERE user_email = ? AND group_name = ?",
      [user_email, groupName]
    );

    if (group.length === 0) {
      return res
        .status(403)
        .json({ message: "User is not a member of the group" });
    }

    // upload the file to s3
    const result = await upLoadFile(file); // need the Key return by s3 to get the image
    const groupPhotoUrl = `/images/${result.Key}`;

    // Update the group's picture URL in the database
    const [updateResult] = await promisePool.execute(
      "UPDATE workout_group SET group_photo_url = ? WHERE group_name = ?",
      [groupPhotoUrl, groupName]
    );

    // delete the file from uploads folder, since it is already uploaded to s3
    await unlinkFile(file.path);
    res
      .status(200)
      .json({ message: "Group picture updated successfully", groupPhotoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createGroup, joinGroup, leaveGroup, handleGroupPicture };
