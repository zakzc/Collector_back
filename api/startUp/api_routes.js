const express = require("express");
const morgan = require("morgan");
const logger = require("../utils/logger");
// middle
const serverError = require("../middleware/serverError");
// routes
const collectionRoutes = require("../routes/collectionRoutes");
const userRoutes = require("../routes/userRoutes");

testData = require("../baseData/collection.json");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }

  app.use(express.json());

  app.use("/collection", collectionRoutes);
  app.use("/collector", userRoutes);

  app.use((req, res) => {
    res.status(404).send("Route not found");
  });
  app.use(serverError);
};
