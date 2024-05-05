const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const activityRecordDao = require("../../dao/activityRecord-dao.js");

const schema = {
  type: "object",
  properties: {
    userID: {type: "string"},
    activityID: {type: "string"},
    date: { type: "string", format: "date-time" },
    duration: { type: "number" },
    points: {type: "number"},
    timestamp: {type:"string"}
  },
  required: ["userID","activityID","date","duration","points"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let activityRecord = req.body;

    // validate input
    const valid = ajv.validate(schema, activityRecord);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    activityRecord = activityRecordDao.create(activityRecord);
    res.json(activityRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
