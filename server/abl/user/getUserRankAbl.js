const Ajv = require("ajv");
const ajv = new Ajv();
const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetUserRankAbl(req, res) {
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
  
      // read user rank by given id
      
      let userList = userDao.list();
      const rank = await userDao.getUserRank(reqParams.id,userList);
      
      if (rank===null) {
        res.status(404).json({
          code: "userNotFound",
          message: `User ${reqParams.id} not found`,
        });
        return;
      }
  
      res.json(rank);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = GetUserRankAbl;