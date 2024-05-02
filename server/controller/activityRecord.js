const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/activityRecord/getAbl");
const ListAbl = require("../abl/activityRecord/listAbl");
const CreateAbl = require("../abl/activityRecord/createAbl");
const DeleteAbl = require("../abl/activityRecord/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
