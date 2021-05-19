const logger = require("../utils/logger");

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      logger.info("An error occurred:\n", err);
      next(err);
    }
  };
};
