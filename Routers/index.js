module.exports = server => {
  require("./Ping")(server);
  require("./User")(server);
  require("./Auth")(server);
};
