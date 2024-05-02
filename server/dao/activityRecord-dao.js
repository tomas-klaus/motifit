const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const activityRecordFolderPath = path.join(__dirname, "storage", "activityRecordList");

// Method to read an activityRecord from a file
function get(activityRecordId) {
  try {
    const filePath = path.join(activityRecordFolderPath, `${activityRecordId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadactivityRecord", message: error.message };
  }
}

// Method to write an activityRecord to a file
function create(activityRecord) {
  try {
    activityRecord.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(activityRecordFolderPath, `${activityRecord.id}.json`);
    const fileData = JSON.stringify(activityRecord);
    fs.writeFileSync(filePath, fileData, "utf8");
    return activityRecord;
  } catch (error) {
    throw { code: "failedToCreateactivityRecord", message: error.message };
  }
}

// Method to remove an activityRecord from a file
function remove(activityRecordId) {
  try {
    const filePath = path.join(activityRecordFolderPath, `${activityRecordId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveactivityRecord", message: error.message };
  }
}

// Method to list activityRecords in a folder
function list(userId) {
  try {
    const files = fs.readdirSync(activityRecordFolderPath);
    let activityRecordList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(activityRecordFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });

    //finds only the activityRecords for specific userID
    activityRecordList = activityRecordList.filter(activity => activity.userID === userId);
    
    activityRecordList.sort((a, b) => new Date(a.date) - new Date(b.date));
    

    return activityRecordList;
  } catch (error) {
    throw { code: "failedToListActivities", message: error.message };
  }
}


module.exports = {
  get,
  create,
  remove,
  list,
};
