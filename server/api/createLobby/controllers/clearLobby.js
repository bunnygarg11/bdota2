const Db = require("../../../services/dotaBot").Db;
const lobbyManager = require("../../../services/dotaBot").lobbyManager;
const CONSTANTS = require("../../../services/dotaBot").CONSTANTS;
const Lobby = require("../../../services/dotaBot").Lobby;
const logger = require("../../../services/dotaBot").logger;
var Services = require("../../../services/network");

const _createsteamlobby = async (req, res, next) => {
  try {

   
     let lobbyState=await Db.testFindAllActiveLobbies()
     lobbyState.forEach(async e=>{
       await lobbyManager[CONSTANTS.EVENT_LOBBY_LEAVE](lobbyState);
       await lobbyManager.removeBot(lobbyState.botId);  
     })

     console.log("lobbyState", lobbyState);
      
     let dotaState=await Db.testFindActiveBots()
     dotaState.forEach(async e=>{
       await lobbyManager.removeBot(dotaState._id);  
     })
     
     console.log("dotaState", dotaState);


      return Services._response(
        res,
        "Invitation sent. Please open your dota client to play the game",
        "Invitation sent. Please open your dota client to play the game"
      );
    
    
  } catch (error) {
    logger.error(error);
    Services._handleError(res, "Error");
  }
};

module.exports = { _createsteamlobby };
