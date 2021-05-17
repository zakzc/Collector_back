const logger = require("../utils/logger");

module.exports = function () {
  process.on("uncaughtException", (except) => {
    logger.error(except.message, except);
    process.exit(1);
  });
  process.on("unhandledRejection", (except) => {
    logger.error(except.message, except);
    process.exit(1);
  });
};
