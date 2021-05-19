const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
  logger.info("Server error:\n", err.message);
  logger.error(err.message, err);
  res.status(500).send("\nServer error:\n");
};
