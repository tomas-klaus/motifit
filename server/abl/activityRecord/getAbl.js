const Ajv = require("ajv");
const ajv = new Ajv();
const activityRecordDao = require("../../dao/activityRecord-dao.js");

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
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read activityRecord by given id
    const activityRecord = activityRecordDao.get(reqParams.id);
    console.log(activityRecord)
    if (!activityRecord) {
      res.status(404).json({
        code: "activityRecordNotFound",
        message: `activityRecord ${reqParams.id} not found`,
      });
      return;
    }

    res.json(activityRecord);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
