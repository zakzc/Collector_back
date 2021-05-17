const express = require("express");
const morgan = require("morgan");
const logger = require("../utils/logger");
// middle
const serverError = require("../middleware/serverError");
// routes
const collectionRoutes = require("../routes/collectionRoutes");

testData = require("../baseData/collection.json");

module.exports = function (app) {
  logger.info("API Routes");

  if (process.env.NODE_ENV === "development") {
    logger.info("Menu routes connected on " + process.env.NODE_ENV + " mode.");
    app.use(morgan("tiny"));
  }

  app.use(express.json());

  app.use("/collection", collectionRoutes);

  app.use((req, res) => {
    res.status(404).send("Route not found");
  });
  app.use(serverError);
};
