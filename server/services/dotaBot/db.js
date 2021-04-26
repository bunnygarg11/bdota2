var dotaBotModel = require("../../models/dotaBot.model");
var dotaLobbyModel = require("../../models/dotaLobby.model");
var dotaLobbyPlayerModel = require("../../models/dotaLobbyPlayer.model");
const response = require("../../core/response");
const logger = require("../../util/log");
const CONSTANTS = require("./constants");

//**********************************************************BOT MODEL***************************************************************************************************************************** */
//**********************************************************BOT MODEL***************************************************************************************************************************** */
//**********************************************************BOT MODEL***************************************************************************************************************************** */
module.exports.findOrCreateBot = async (
  steamId64,
  accountName,
  personaName,
  password
) => {
  try {
    return await dotaBotModel.create({
      steamId64,
      accountName,
      personaName,
      password,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateBotStatusBySteamId = async (status, steamId64) => {
  try {
    return await dotaBotModel.findOneAndUpdate(
      {
        steamId64,
      },
      {
        status,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateBotStatus = async (status, _id) => {
  try {
    return await dotaBotModel.findOneAndUpdate(
      {
        _id,
      },
      {
        status,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findBot = async (_id) => {
  try {
    return await dotaBotModel.findOne({
      _id,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findBotBySteamId64 = async (steamId64) => {
  try {
    return await dotaBotModel.findOne({
      steamId64,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findUnassignedBot = async () => {
  try {
    return await dotaBotModel.findOne({
      status: {
        $in: [CONSTANTS.BOT_OFFLINE, CONSTANTS.BOT_IDLE],
      },
      lobbyCount: {
        $lt: 5,
      },
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.assignBotToLobby = async (lobby, botId) => {
  try {
    await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobby._id,
      },
      {
        botId,
      },
      {
        new: true,
      }
    );
    return await dotaBotModel.findOneAndUpdate(
      {
        _id: botId,
      },
      {
        $inc: {
          lobbyCount: 1,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.setAllBotsOffline = async () => {
  try {
    return await dotaBotModel.updateMany(
      {
        status: {
          $ne: CONSTANTS.BOT_OFFLINE,
        },
      },
      {
        status: CONSTANTS.BOT_OFFLINE,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateBot = async (steamId64) => async (values) => {
  try {
    return await dotaBotModel.findOneAndUpdate(
      {
        steamId64,
      },
      values,
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.destroyBotBySteamID64 = async (steamId64) => {
  try {
    return await dotaBotModel.findOneAndDelete({
      steamId64,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

//**********************************************************LOBBY MODEL***************************************************************************************************************************** */
//**********************************************************LOBBY MODEL***************************************************************************************************************************** */
//**********************************************************LOBBY MODEL***************************************************************************************************************************** */

module.exports.findAllActiveLobbies = async () => {
  try {
    return await dotaLobbyModel.find({
      state: {
        $nin: [
          CONSTANTS.STATE_COMPLETED,
          CONSTANTS.STATE_COMPLETED_NO_STATS,
          CONSTANTS.STATE_KILLED,
          CONSTANTS.STATE_FAILED,
        ],
      },
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findActiveLobbiesForUser = async (userId) => {
  try {
    return await dotaLobbyModel.find({
      state: {
        $nin: [
          CONSTANTS.STATE_COMPLETED,
          CONSTANTS.STATE_COMPLETED_NO_STATS,
          CONSTANTS.STATE_KILLED,
          CONSTANTS.STATE_FAILED,
        ],
        players: userId,
      },
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findPendingLobby = async () => {
  try {
    return await dotaLobbyModel.findOne({
      state: CONSTANTS.STATE_WAITING_FOR_QUEUE,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findAllInProgressLobbies = async () => {
  try {
    return await dotaLobbyModel.find({
      state: CONSTANTS.STATE_MATCH_IN_PROGRESS,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findLobbyByName = async (lobbyName) => {
  try {
    return await dotaLobbyModel.findOne({
      lobbyName,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findLobbyByMatchId = async (matchId) => {
  try {
    return await dotaLobbyModel.findOne({
      matchId,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findOrCreateLobby = async ( player) => {
  try {
    return await dotaLobbyModel.create({
      state: CONSTANTS.STATE_WAITING_FOR_QUEUE,
      password: hri.random(),
      // lobbyName,
      players: [player],
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findLobbyByDotaLobbyId = async (dotaLobbyId) => {
  try {
    return await dotaLobbyModel.findOne({
      dotaLobbyId,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findLobbyById = async (_id) => {
  try {
    return await dotaLobbyModel.findOne({
      _id,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.unassignBotFromLobby = async (lobby, botId) => {
  try {
    await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobby._id,
      },
      {
        botId: null,
        dotaLobbyId: null,
      },
      {
        new: true,
      }
    );

    return await dotaBotModel.findOneAndUpdate(
      {
        _id: botId,
      },
      {
        $inc: {
          lobbyCount: -1,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};




module.exports.updateLobbyState = async (lobbyOrState, state) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        state,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobbyName = async (lobbyOrState, lobbyName) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        lobbyName,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobbyChannel = async (lobbyOrState, channel) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState.id,
      },
      {
        channel,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobbyState = async (lobbyOrState, state) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        state,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobbyWinner = async (lobbyOrState, winner) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        winner,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobby = async (lobbyOrState) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        lobbyOrState,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.updateLobbyFailed = async (lobbyOrState, failReason) => {
  try {
    const result = await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        state: CONSTANTS.STATE_FAILED,
        failReason,
      },
      {
        new: true,
      }
    );

    // cache.Lobbies.delete(lobbyOrState.id);
    return result;
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findAllMatchEndedLobbies = async () => {
  try {
    return await dotaLobbyModel.find({
      state: CONSTANTS.STATE_MATCH_ENDED,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.findAllLobbiesInState = async (state) => {
  try {
    return await dotaLobbyModel.find({
      state,
    });
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.getLobbyPlayers = async (lobbyOrState, options) => {
  try {
    let condition = options
      ? {
          _id: lobbyOrState._id,
          ...options,
        }
      : {
          _id: lobbyOrState._id,
        };
    return await dotaLobbyModel.findOne(condition).select("players");
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.addPlayer = async (lobbyOrState, player) => {
  try {
    return await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        $push: {
          players: player,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};

module.exports.removePlayer = async (lobbyOrState, player) => {
  try {
    return await dotaLobbyModel.findOneAndUpdate(
      {
        _id: lobbyOrState._id,
      },
      {
        $pull: {
          players: player,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    logger.error(err);
    throw err.message;
  }
};
