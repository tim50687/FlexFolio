const { upLoadFile, getFileStream } = require("../s3"); // for user profile picture update
// file system
const fs = require("fs");
const { join } = require("path");
const utils = require("util");
const unlinkFile = utils.promisify(fs.unlink);

// Create a new group
const createGroup = (promisePool) => async (req, res) => {
  try {
    const { group_name, description, passcode, group_photo_url } = req.body;
    const { user_email } = req.user;

    // Check if the passcode is already in use
    const [existingGroup] = await promisePool.execute(
      "SELECT 1 FROM workout_group WHERE group_passcode = ?",
      [passcode]
    );

    if (existingGroup.length > 0) {
      return res
        .status(409) // Conflict status
        .json({ success: false, message: "The passcode has been used" });
    }

    // Call the stored procedure, passing NULL for groupPhotoUrl
    await promisePool.execute("CALL create_group(?, ?, ?, ?, ?)", [
      group_name,
      description,
      passcode,
      user_email,
      group_photo_url,
    ]);

    // Fetch the created group's details
    const [groupRows] = await promisePool.execute(
      "SELECT * FROM workout_group WHERE group_name = ?",
      [group_name]
    );

    // Check if group details are available
    if (groupRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found after creation" });
    }

    const createdGroup = groupRows[0];

    res
      .status(201)
      .json({ message: "Group created successfully", group: createdGroup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// User join group
const joinGroup = (promisePool) => async (req, res) => {
  try {
    const { group_code } = req.body;

    const { user_email } = req.user;

    // First, check if a group with the given group_code exists
    const [group] = await promisePool.execute(
      "SELECT group_name FROM workout_group WHERE group_passcode = ?",
      [group_code]
    );

    // If no group is found, return an error
    if (group.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    // If group is found, proceed to join the user to the group
    await promisePool.execute("CALL join_group(?, ?, ?)", [
      group[0].group_name,
      user_email,
      group_code,
    ]);

    // Fetch the created group's details
    const [groupRows] = await promisePool.execute(
      "SELECT * FROM workout_group WHERE group_name = ?",
      [group[0].group_name]
    );

    const joinedGroup = groupRows[0];
    console.log(joinedGroup);
    res
      .status(201)
      .json({ message: "Group joined successfully", group: joinedGroup });
  } catch (err) {
    console.error(err);

    // Specific error handling for the custom error raised by the stored procedure
    if (
      err.code === "ER_SIGNAL_EXCEPTION" &&
      err.message.includes("Invalid passcode")
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid passcode" });
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Leave group
const leaveGroup = (promisePool) => async (req, res) => {
  try {
    const { group_name } = req.body;

    const { user_email } = req.user;

    // First, check if the user is part of the group
    const [checkResult] = await promisePool.execute(
      "SELECT 1 FROM user_group WHERE user_email = ? AND group_name = ?",
      [user_email, group_name]
    );

    if (checkResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found in the group or group does not exist",
      });
    }

    // Proceed to delete the user from the group
    await promisePool.execute(
      "DELETE FROM user_group WHERE user_email = ? AND group_name = ?",
      [user_email, group_name]
    );
    res.status(200).json({ message: "Successfully left the workout group" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Set up group picture
const handleGroupPicture = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user;
    // const { groupName } = req.body;

    // return by multer middleware
    const file = req.file; // filename and path will be used by s3

    // upload the file to s3
    const result = await upLoadFile(file); // need the Key return by s3 to get the image
    const groupPhotoUrl = `/images/${result.Key}`;

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

const getGroupPicture = (promisePool) => async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the group that you joined
const getBelongingGroups = (promisePool) => async (req, res) => {
  try {
    const { user_email } = req.user;

    const [groups] = await promisePool.execute(
      "SELECT ug.user_email, ug.group_name, wg.group_photo_url FROM user_group ug " +
        "JOIN workout_group wg ON ug.group_name = wg.group_name " +
        "WHERE ug.user_email = ?",
      [user_email]
    );

    res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get the group details

const getGroupDetails = (promisePool) => async (req, res) => {
  const { group_name } = req.params;

  try {
    // fetch the group details from the database

    const [groupRows] = await promisePool.execute(
      "SELECT * FROM workout_group WHERE group_name = ?",
      [group_name]
    );

    // Check if group details are available

    if (groupRows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const group = groupRows[0];

    res.status(200).json({ group: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createGroup,
  joinGroup,
  leaveGroup,
  handleGroupPicture,
  getGroupPicture,
  getBelongingGroups,
  getGroupDetails,
};
