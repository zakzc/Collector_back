const mongoose = require("mongoose");
const logger = require("../utils/logger");

let testUser = require("../baseData/collection.json");

logger.info("Collection Controller on", testUser);

function getAll(req, res) {
  logger.info("received call to get all data");
  res.status(200).send(testUser);
}

exports.getAll = getAll;
