import config from "./../../Config";
import v1 from "./v1";

module.exports = server => {
  server.post(
    { path: config.basePath("/auth/login"), version: "1.0.0" },
    v1.login
  );
};
