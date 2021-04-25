const Db = require("../../../services/dotaBot").Db;
const lobbyManager = require("../../../services/dotaBot").lobbyManager;
const CONSTANTS = require("../../../services/dotaBot").CONSTANTS;
var Services = require("../../../services/network");

const _createsteamlobby = async (req, res, next) => {
  //   const db = await coreDB.openDBConnnection();
  try {
    const { steamId } = req.query;

    let lobbyState = await Db.findActiveLobbiesForUser(steamId);

    if (lobbyState) {
      return Services._validationError(res, "Already registered for lobby");
    }

    lobbyState = await Db.findPendingLobby();

    if (lobbyState && lobbyState.length) {
      lobbyState = await Db.addPlayer(lobbyState[0], steamId);
    } else {
      lobbyState = await Db.findOrCreateLobby(lobbyState, steamId);
    }

    if ((lobbyState.players.length = 2)) {
      lobbyState.state = CONSTANTS.STATE_WAITING_FOR_BOT;
      Db.updateLobby(lobbyState);

      // lobbyManager.runLobby(lobbyState, [CONSTANTS.STATE_WAITING_FOR_BOT]);
        await lobbyManager[CONSTANTS.EVENT_RUN_LOBBY](lobbyState,[
          CONSTANTS.STATE_WAITING_FOR_BOT,
        ]);


      return Services._response(
        res,
        "Invitation sent. Please open your dota client to play the game",
        "Invitation sent. Please open your dota client to play the game"
      );
    }
    return Services._response(
      res,
      "waiting for the other player",
      "waiting for the other player"
    );
  } catch (error) {
    Services._handleError(res,"Error")
  } 
};

module.exports = { _createsteamlobby };
