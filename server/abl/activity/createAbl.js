const Ajv = require("ajv");
const ajv = new Ajv();

const activityDao = require("../../dao/activity-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    points: { type: "integer" },
    icon: { type: "string" },
  },
  required: ["name", "points"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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


    activity = activityDao.create(activity);
    res.json(activity);
  } catch (e) {
    res.status(500).json({ activity: e.activity });
  }
}

module.exports = CreateAbl;
