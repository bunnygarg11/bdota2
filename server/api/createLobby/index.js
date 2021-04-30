const express = require("express");
const router = express.Router();
const { _createsteamlobby } = require("./controllers/createLobby");
const { _bupdateQuery } = require("./controllers/query");
const { _bpractice } = require("./controllers/bpractice");


router.get("/createLobby", _createsteamlobby);
router.get("/bupdateQuery", _bupdateQuery);
router.get("/bpractice", _bpractice);

module.exports = router;
