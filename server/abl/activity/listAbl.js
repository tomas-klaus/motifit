const activityDao = require("../../dao/activity-dao.js");

async function ListAbl(req, res) {
  try {
    const activityList = activityDao.list();
    res.json(activityList);
  } catch (e) {
    res.status(500).json({ activity: e.activity });
  }
}

module.exports = ListAbl;
