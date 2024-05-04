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


async function ListAbl(req, res) {
  try {

    const reqParams = req.query?.id ? req.query : req.body; // Get userId from query parameters
    //console.log(userId);


    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    const activityRecordList = activityRecordDao.list(reqParams.id);
    
    res.json(activityRecordList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
