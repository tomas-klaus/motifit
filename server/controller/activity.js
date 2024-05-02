const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/activity/getAbl");
const ListAbl = require("../abl/activity/listAbl");
const CreateAbl = require("../abl/activity/createAbl");
const UpdateAbl = require("../abl/activity/updateAbl");
const DeleteAbl = require("../abl/activity/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
