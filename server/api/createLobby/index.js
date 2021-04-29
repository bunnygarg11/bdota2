const express = require("express");
const router = express.Router();
const { _createsteamlobby } = require("./controllers/createLobby");
const { _bupdateQuery } = require("./controllers/query");


router.get("/createLobby", _createsteamlobby);
router.get("/bupdateQuery", _bupdateQuery);

module.exports = router;
