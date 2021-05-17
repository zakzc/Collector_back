const express = require("express");
// init
const app = express();
require("dotenv").config();
// log
const logger = require("./api/utils/logger");

// start up
require("./api/startUp/logs");
require("./api/startUp/api_routes")(app);
require("./api/startUp/db_connect")();

let port;

if (process.env.NODE_ENV === "test") {
  port = process.env.TEST_PORT || 5000;
} else {
  port = process.env.PORT;
}

const server = app.listen(port, () =>
  logger.info(`App listening on port: ${port}\n`)
);

module.exports = server;
