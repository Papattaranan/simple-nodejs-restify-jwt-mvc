import restify from "restify";

// [0] สร้าง restify server
const server = restify.createServer({
  name: "nodejs-restful-api-restify"
});

// [1] กำหนด restify parser
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// [3] Test server
server.get("/", (req, res) => {
  res.json("Server UP!!!");
});

// [2] Starting server
server.listen(3000, () => {
  console.log("Start up at 3000!");
});
