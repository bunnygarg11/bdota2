/**
 * @module constants
 */

/**
 * Enum for all constant values.
 * @readonly
 * @enum {string}
 * @memberof module:constants
 */
const CONSTANTS = {
  DOTA_GAMEMODE_CM: "DOTA_GAMEMODE_CM",
  DOTA_GAMEMODE_CD: "DOTA_GAMEMODE_CD",
  DOTA_GAMEMODE_AP: "DOTA_GAMEMODE_AP",
  STATE_FAILED: "STATE_FAILED",
  STATE_KILLED: "STATE_KILLED",
  STATE_PENDING_KILL: "STATE_PENDING_KILL",
  STATE_NEW: "STATE_NEW",
  STATE_WAITING_FOR_QUEUE: "STATE_WAITING_FOR_QUEUE",
  STATE_BEGIN_READY: "STATE_BEGIN_READY",
  STATE_CHECKING_READY: "STATE_CHECKING_READY",
  STATE_ASSIGNING_CAPTAINS: "STATE_ASSIGNING_CAPTAINS",
  STATE_SELECTION_PRIORITY: "STATE_SELECTION_PRIORITY",
  STATE_DRAFTING_PLAYERS: "STATE_DRAFTING_PLAYERS",
  STATE_AUTOBALANCING: "STATE_AUTOBALANCING",
  STATE_TEAMS_SELECTED: "STATE_TEAMS_SELECTED",
  STATE_WAITING_FOR_BOT: "STATE_WAITING_FOR_BOT",
  STATE_BOT_ASSIGNED: "STATE_BOT_ASSIGNED",
  STATE_BOT_CREATED: "STATE_BOT_CREATED",
  STATE_BOT_FAILED: "STATE_BOT_FAILED",
  STATE_BOT_STARTED: "STATE_BOT_STARTED",
  STATE_BOT_CONNECTED: "STATE_BOT_CONNECTED",
  STATE_WAITING_FOR_PLAYERS: "STATE_WAITING_FOR_PLAYERS",
  STATE_MATCH_IN_PROGRESS: "STATE_MATCH_IN_PROGRESS",
  STATE_MATCH_ENDED: "STATE_MATCH_ENDED",
  STATE_MATCH_STATS: "STATE_MATCH_STATS",
  STATE_MATCH_NO_STATS: "STATE_MATCH_NO_STATS",
  STATE_COMPLETED: "STATE_COMPLETED",
  STATE_COMPLETED_NO_STATS: "STATE_COMPLETED_NO_STATS",
  EVENT_MATCH_OUTCOME: "EVENT_MATCH_OUTCOME",
  EVENT_MATCH_SIGNEDOUT: "EVENT_MATCH_SIGNEDOUT",
  EVENT_MATCH_STATS: "EVENT_MATCH_STATS",
  EVENT_MATCH_NO_STATS: "EVENT_MATCH_NO_STATS",
  EVENT_PLAYER_READY: "EVENT_PLAYER_READY",
  EVENT_SELECTION_PICK: "EVENT_SELECTION_PICK",
  EVENT_SELECTION_SIDE: "EVENT_SELECTION_SIDE",
  EVENT_PICK_PLAYER: "EVENT_PICK_PLAYER",
  EVENT_LOBBY_FORCE_DRAFT: "EVENT_LOBBY_FORCE_DRAFT",
  EVENT_LOBBY_START: "EVENT_LOBBY_START",
  EVENT_LOBBY_LEAVE: "EVENT_LOBBY_LEAVE",
  EVENT_LOBBY_KILL: "EVENT_LOBBY_KILL",
  EVENT_LOBBY_INVITE: "EVENT_LOBBY_INVITE",
  EVENT_LOBBY_READY: "EVENT_LOBBY_READY",
  EVENT_LOBBY_SET_STATE: "EVENT_LOBBY_SET_STATE",
  EVENT_LOBBY_SET_FP: "EVENT_LOBBY_SET_FP",
  EVENT_LOBBY_SET_GAMEMODE: "EVENT_LOBBY_SET_GAMEMODE",
  EVENT_LOBBY_SWAP_TEAMS: "EVENT_LOBBY_SWAP_TEAMS",
  EVENT_BOT_LOBBY_LEFT: "EVENT_BOT_LOBBY_LEFT",
  EVENT_BOT_SET_STATUS: "EVENT_BOT_SET_STATUS",
  EVENT_LEAGUE_TICKET_ADD: "EVENT_LEAGUE_TICKET_ADD",
  EVENT_LEAGUE_TICKET_SET: "EVENT_LEAGUE_TICKET_SET",
  EVENT_LEAGUE_TICKET_REMOVE: "EVENT_LEAGUE_TICKET_REMOVE",
  EVENT_GUILD_MESSAGE: "EVENT_GUILD_MESSAGE",
  EVENT_BOT_AVAILABLE: "EVENT_BOT_AVAILABLE",
  EVENT_RUN_LOBBY: "EVENT_RUN_LOBBY",
  EVENT_GUILD_USER_LEFT: "EVENT_GUILD_USER_LEFT",
  MSG_WAITING_FOR_CAPTAINS: "MSG_WAITING_FOR_CAPTAINS",
  MSG_ASSIGNED_CAPTAINS: "MSG_ASSIGNED_CAPTAINS",
  MSG_PLAYER_DRAFT_PRIORITY: "MSG_PLAYER_DRAFT_PRIORITY",
  MSG_SELECTION_PRIORITY: "MSG_SELECTION_PRIORITY",
  MSG_SELECTION_PICK: "MSG_SELECTION_PICK",
  MSG_SELECTION_SIDE: "MSG_SELECTION_SIDE",
  MSG_DRAFT_TURN: "MSG_DRAFT_TURN",
  MSG_MATCH_STATS: "MSG_MATCH_STATS",
  MSG_MATCH_NO_STATS: "MSG_MATCH_NO_STATS",
  MSG_TEAMS_SELECTED: "MSG_TEAMS_SELECTED",
  MSG_BOT_ASSIGNED: "MSG_BOT_ASSIGNED",
  MSG_BOT_UNASSIGNED: "MSG_BOT_UNASSIGNED",
  MSG_BOT_FAILED: "MSG_BOT_FAILED",
  MSG_LOBBY_STATE: "MSG_LOBBY_STATE",
  MSG_LOBBY_INVITES_SENT: "MSG_LOBBY_INVITES_SENT",
  MSG_LOBBY_STARTED: "MSG_LOBBY_STARTED",
  MSG_LOBBY_KILLED: "MSG_LOBBY_KILLED",
  MSG_LOBBY_PLAYER_JOINED: "MSG_LOBBY_PLAYER_JOINED",
  MSG_LOBBY_PLAYER_LEFT: "MSG_LOBBY_PLAYER_LEFT",
  MSG_LOBBY_PLAYER_CHANGED_SLOT: "MSG_LOBBY_PLAYER_CHANGED_SLOT",
  MSG_CHAT_MESSAGE: "MSG_CHAT_MESSAGE",
  MSG_READY_CHECK_START: "MSG_READY_CHECK_START",
  MSG_READY_CHECK_FAILED: "MSG_READY_CHECK_FAILED",
  MSG_PLAYERS_READY: "MSG_PLAYERS_READY",
  MSG_AUTOBALANCING: "MSG_AUTOBALANCING",
  MSG_MATCH_ENDED: "MSG_MATCH_ENDED",
  CAPTAIN_MATCH_EXISTS: "CAPTAIN_MATCH_EXISTS",
  CAPTAIN_MATCH_FOUND: "CAPTAIN_MATCH_FOUND",
  NO_CAPTAIN_MATCH_FOUND: "NO_CAPTAIN_MATCH_FOUND",
  PLAYER_DRAFTED: "PLAYER_DRAFTED",
  INVALID_DRAFT_PLAYER: "INVALID_DRAFT_PLAYER",
  INVALID_DRAFT_CAPTAIN: "INVALID_DRAFT_CAPTAIN",
  INVALID_PLAYER_NOT_FOUND: "INVALID_PLAYER_NOT_FOUND",
  BOT_UNAVAILABLE: "BOT_UNAVAILABLE",
  BOT_LOADING: "BOT_LOADING",
  BOT_ONLINE: "BOT_ONLINE",
  BOT_IDLE: "BOT_IDLE",
  BOT_IN_LOBBY: "BOT_IN_LOBBY",
  BOT_OFFLINE: "BOT_OFFLINE",
  BOT_FAILED: "BOT_FAILED",
  QUEUE_JOINED: "QUEUE_JOINED",
  QUEUE_BANNED: "QUEUE_BANNED",
  QUEUE_ALREADY_JOINED: "QUEUE_ALREADY_JOINED",
  QUEUE_LOBBY_INVALID_STATE: "QUEUE_LOBBY_INVALID_STATE",
  QUEUE_TYPE_DRAFT: "QUEUE_TYPE_DRAFT",
  QUEUE_TYPE_AUTO: "QUEUE_TYPE_AUTO",
  QUEUE_TYPE_CHALLENGE: "QUEUE_TYPE_CHALLENGE",
  MATCH_EXACT_DISCORD_MENTION: "MATCH_EXACT_DISCORD_MENTION",
  MATCH_EXACT_DISCORD_NAME: "MATCH_EXACT_DISCORD_NAME",
  MATCH_STEAMID_64: "MATCH_STEAMID_64",
  MATCH_EXACT_NICKNAME: "MATCH_EXACT_NICKNAME",
  MATCH_CLOSEST_NICKNAME: "MATCH_CLOSEST_NICKNAME",
};

module.exports = CONSTANTS;