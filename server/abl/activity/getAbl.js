const Ajv = require("ajv");
const ajv = new Ajv();
const activityDao = require("../../dao/activity-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        activity: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read activity by given id
    const activity = activityDao.get(reqParams.id);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        activity: `activity ${reqParams.id} not found`,
      });
      return;
    }

    res.json(activity);
  } catch (e) {
    res.status(500).json({ activity: e.activity });
  }
}

module.exports = GetAbl;
