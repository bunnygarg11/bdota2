const express = require("express");
const router = express.Router();
const { _createsteamlobby } = require("./controllers/createLobby");


router.get("/createLobby", _createsteamlobby);

module.exports = router;
