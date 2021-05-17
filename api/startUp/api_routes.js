const express = require("express");
const morgan = require("morgan");
const logger = require("../utils/logger");

module.exports = function (app) {
  logger.info("Route required");
  app.use(express.json());
  app.use((req, res) => {
    res.status(200).send("Hello");
  });
};
