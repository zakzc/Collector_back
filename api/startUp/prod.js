const helmet = require("helmet");

module.exports = function (app) {
  app.use(helmet());
  // app.use(compression());
};

// comment out compression for production
