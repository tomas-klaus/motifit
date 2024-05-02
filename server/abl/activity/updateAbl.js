const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const activityDao = require("../../dao/activity-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    points: { type: "number" },
    icon: { type: "number" },
  },
  required: ["id", "points"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let activity = req.body;

    // validate input
    const valid = ajv.validate(schema, activity);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        activity: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedactivity = activityDao.update(activity);

    if (!updatedactivity) {
      res.status(404).json({
        code: "activityNotFound",
        activity: `activity ${activity.id} not found`,
      });
      return;
    }

    res.json(updatedactivity);
  } catch (e) {
    res.status(500).json({ activity: e.activity });
  }
}

module.exports = UpdateAbl;
