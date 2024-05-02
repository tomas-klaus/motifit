const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const GetUserRankAbl = require("../abl/user/getUserRankAbl");
const ListAbl = require("../abl/user/listAbl");
const CreateAbl = require("../abl/user/createAbl");
const UpdateAbl = require("../abl/user/updateAbl");
const DeleteAbl = require("../abl/user/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/getUserRank", (req, res) => {
  GetUserRankAbl(req, res);
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
