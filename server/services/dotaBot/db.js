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
) =>
  dotaBotModel.create({
    steamId64,
    accountName,
    personaName,
    password,
  });

module.exports.updateBotStatusBySteamId = async (status,steamId64) => {
  try {
    return await dotaBotModel.findOneAndUpdate({steamId64}, {status}, {
      new: true,
    });
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.findBot = async (_id) => {
  try {
    return await dotaBotModel.findOne({_id});
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.findBotBySteamId64 = async (steamId64) => {
  try {
    return await dotaBotModel.findOne({steamId64});
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.findUnassignedBot=()=>{

  try {
    return await dotaBotModel.findOne({status:{$in:[CONSTANTS.BOT_OFFLINE, CONSTANTS.BOT_IDLE]},lobbyCount:{$lt:5}});
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
}



module.exports.assignBotToLobby=async(lobby,botId)=>{
await dotaLobbyModel.findOneAndUpdate({_id:lobby.id},{botId})
return await dotaBotModel.findOneAndUpdate({_id:botId},{ $inc: { lobbyCount: 1 },})
}

module.exports.setAllBotsOffline = async () => {
  try {
    return await dotaBotModel.updateMany(
      { status: { $ne: CONSTANTS.BOT_OFFLINE } },
      { status: CONSTANTS.BOT_OFFLINE }
    );
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.updateBot = (steamId64) => async (values) =>
  // db.Bot.update(values, { where: { steamId64 } });
  await dotaBotModel.findOneAndUpdate({ steamId64 }, values, {
    new: true,
  });



  module.exports.destroyBotBySteamID64 =  async (steamId64) =>
  // db.Bot.update(values, { where: { steamId64 } });
  await dotaBotModel.findOneAndDelete({ steamId64 });

//**********************************************************LOBBY MODEL***************************************************************************************************************************** */
//**********************************************************LOBBY MODEL***************************************************************************************************************************** */
//**********************************************************LOBBY MODEL***************************************************************************************************************************** */

module.exports.findAllActiveLobbies =  () =>
  dotaLobbyModel.find({
    state: {
      $nin: [
        CONSTANTS.STATE_COMPLETED,
        CONSTANTS.STATE_COMPLETED_NO_STATS,
        CONSTANTS.STATE_KILLED,
        CONSTANTS.STATE_FAILED,
      ],
    },
  });


  module.exports.findActiveLobbiesForUser = (userId) =>
  dotaLobbyModel.find({
    state: {
      $nin: [
        CONSTANTS.STATE_COMPLETED,
        CONSTANTS.STATE_COMPLETED_NO_STATS,
        CONSTANTS.STATE_KILLED,
        CONSTANTS.STATE_FAILED,
      ],
      players:userId,
    },
  });

module.exports.findPendingLobby=()=>dotaLobbyModel.findOne({state:CONSTANTS.STATE_WAITING_FOR_QUEUE})

  module.exports.findAllInProgressLobbies = async () =>
  dotaLobbyModel.find({
    state: CONSTANTS.STATE_MATCH_IN_PROGRESS,
  });
module.exports.findLobbyByName = async (lobbyName) => {
  try {
    return await dotaLobbyModel.findOne({ lobbyName });
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};


module.exports.findLobbyByMatchId = async (matchId) => {
  try {
    return await dotaLobbyModel.findOne({ matchId });
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};





module.exports.findOrCreateLobby= (lobbyName,player) =>
  dotaLobbyModel.create({
    state: CONSTANTS.STATE_WAITING_FOR_QUEUE,
    password: hri.random(),
    lobbyName,
    players:[player]
  });


module.exports.findLobbyByDotaLobbyId = async (dotaLobbyId) => {
  try {
    return await dotaLobbyModel.findOne({dotaLobbyId});
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.findLobbyById = async (_id) => {
  try {
    return await dotaLobbyModel.findOne({ _id });
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};

module.exports.unassignBotFromLobby = async (lobby,botId) => {
  try {
    await dotaLobbyModel.findOneAndUpdate(
      { _id: lobby.id },
      { botId: null, dotaLobbyId: null }
    );

    return await dotaBotModel.findOneAndUpdate(
      { _id: botId },
      { $inc:{lobbyCount: -1} }
    );
  } catch (err) {
    logger.error(err.message, err);
    throw err.message;
  }
};
// db.sequelize.transaction(async (t) => {
//   await db.Lobby.update(
//     { botId: null, dotaLobbyId: null },
//     { where: { id: lobby.id }, transaction: t }
//   );
//   cache.Lobbies.delete(lobby.id);
//   await db.Bot.increment(
//     { lobbyCount: -1 },
//     { where: { id: botId }, transaction: t }
//   );
// });

module.exports.updateLobbyState =  async (lobbyOrState,state) => {
  // const result = await db.Lobby.update({ state }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { state }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};


module.exports.updateLobbyName =  async (lobbyOrState,lobbyName) => {
  // const result = await db.Lobby.update({ state }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { lobbyName }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};


module.exports.updateLobbyChannel =  async (lobbyOrState,channel) => {
  // const result = await db.Lobby.update({ state }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { channel }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};


module.exports.updateLobbyState =  async (lobbyOrState,state) => {
  // const result = await db.Lobby.update({ state }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { state }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};



module.exports.updateLobbyWinner =  async (lobbyOrState,winner) => {
  // const result = await db.Lobby.update({ winner }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { winner }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};


module.exports.updateLobby =  async (lobbyOrState) => {
  // const result = await db.Lobby.update({ winner }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { lobbyOrState }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};


module.exports.updateLobbyFailed =  async (lobbyOrState,failReason) => {
  // const result = await db.Lobby.update({ winner }, { where: { id: lobbyOrState.id } });
  const result = await dotaLobbyModel.findOneAndUpdate(
    { _id: lobbyOrState.id },
    { state: CONSTANTS.STATE_FAILED, failReason }
  );

  // cache.Lobbies.delete(lobbyOrState.id);
  return result;
};







module.exports.findAllMatchEndedLobbies = async () =>
  dotaLobbyModel.find({
    state: CONSTANTS.STATE_MATCH_ENDED,
  });

module.exports.findAllLobbiesInState = async (state) =>
    dotaLobbyModel.find({
      state
    });

module.exports.getLobbyPlayers=(lobbyOrState,options)=>{

  let condition ={_id:lobbyOrState.id,...options}
  return dotaLobbyModel.findOne(condition)
}


module.exports.addPlayer=(lobbyOrState,player)=>dotaLobbyModel.findOneAndUpdate({_id:lobbyOrState.id},{$push:{players:player}})

module.exports.removePlayer=(lobbyOrState,player)=>dotaLobbyModel.findOneAndUpdate({_id:lobbyOrState.id},{$pull:{players:player}})