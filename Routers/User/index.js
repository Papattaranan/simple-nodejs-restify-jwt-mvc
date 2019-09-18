import config from "./../../Config";
import v1 from "./v1";

module.exports = server => {
  server.post(
    { path: config.basePath("/users"), version: "1.0.0" },
    v1.register
  );

  server.post(
    { path: config.basePath("/users/logout"), version: "1.0.0"},
    v1.logout
  )

  server.post(
    { path: config.basePath("/users/logoutall"), version: "1.0.0"},
    v1.logoutAll
  )

  server.get(
    { path: config.basePath("/users/me"), version: "1.0.0"},
    v1.me
  )
};
