const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const activityFolderPath = path.join(__dirname, "storage", "activityList");

// Method to read an activity from a file
function get(activityId) {
  try {
    const filePath = path.join(activityFolderPath, `${activityId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadActivity", activity: error.activity };
  }
}

// Method to write an activity to a file
function create(activity) {
  try {
    activity.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(activityFolderPath, `${activity.id}.json`);
    const fileData = JSON.stringify(activity);
    fs.writeFileSync(filePath, fileData, "utf8");
    return activity;
  } catch (error) {
    throw { code: "failedToCreateActivity", activity: error.activity };
  }
}

// Method to update activity in a file
function update(activity) {
  try {
    const currentactivity = get(activity.id);
    if (!currentactivity) return null;
    const newactivity = { ...currentactivity, ...activity };
    const filePath = path.join(activityFolderPath, `${activity.id}.json`);
    const fileData = JSON.stringify(newactivity);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newactivity;
  } catch (error) {
    throw { code: "failedToUpdateActivity", activity: error.activity };
  }
}

// Method to remove an activity from a file
function remove(activityId) {
  try {
    const filePath = path.join(activityFolderPath, `${activityId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveActivity", activity: error.activity };
  }
}

// Method to list activities in a folder
function list() {
  try {
    const files = fs.readdirSync(activityFolderPath);
    const activityList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(activityFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return activityList;
  } catch (error) {
    throw { code: "failedToListActivities", activity: error.activity };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
