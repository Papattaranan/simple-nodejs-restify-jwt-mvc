import restify from "restify";
import mongoose from "mongoose";
import config from "./Config";
import logger from "./Utils/logger";
import jwt from "restify-jwt-community";

const MODULE_ID = "app:main";

logger.info(`%s: initializing ${MODULE_ID}`);

// [0] สร้าง restify server
const server = restify.createServer({
  name: "nodejs-restful-api-restify"
});

// [1] กำหนด restify parser
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// [4] Set mongoose default promise
mongoose.Promise = global.Promise;

// [5] Connecting to DB
mongoose
  .connect(config.DB_HOST, {
    user: encodeURI(config.DB_USER),
    pass: encodeURI(config.DB_PASS),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    _ => {
      console.log("Successfully connected to DB!");
    },
    err => {
      console.log("An error occurred while connecting to DB!");
      throw new Error(err);
    }
  );

// [3] Call routers
const jwtConfig = {
  secret: config.JWT_SECRET
};

/**
 * ดัก login route ทั้งหมดยกเว้นสิ่งที่อยู่ใน path
 */
server.use(
  jwt(jwtConfig).unless({
    path: [
      config.basePath("/ping"),
      config.basePath("/users"),
      config.basePath("/auth/login"),
    ]
  })
);

require("./Routers")(server);

// [2] Starting server
server.listen(config.PORT, () => {
  logger.info(`%s: ready ${MODULE_ID}. listening on PORT ${config.PORT}`);
});

module.exports = server;
