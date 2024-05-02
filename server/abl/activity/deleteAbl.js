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

async function DeleteAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

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

    activityDao.remove(reqParams.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ activity: e.activity });
  }
}

module.exports = DeleteAbl;
