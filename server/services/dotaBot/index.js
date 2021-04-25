module.exports = {
  Db: require("./db"),
  lobbyManager: new require("./lobbyManager")(),
  CONSTANTS:require("./constants")
};
