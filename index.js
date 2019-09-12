import restify from "restify";
import mongoose from "mongoose";

// [0] สร้าง restify server
const server = restify.createServer({
  name: "nodejs-restful-api-restify"
});

// [1] กำหนด restify parser
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// [5] Set mongoose default promise
mongoose.Promise = global.Promise;

// [6] Read the .env file
require("dotenv").config();

// [7] Connecting to DB
mongoose
  .connect(process.env.DB_HOST, {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
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

// [3] Test server
server.get("/", (req, res) => {
  res.json("Server UP!!!");
});

// [4] Call routers
require("./Routers/User.route")(server);

// [2] Starting server
server.listen(3000, () => {
  console.log("Start up at 3000!");
});
