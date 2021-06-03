const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// middle
const serverError = require("../middleware/serverError");
// routes
// const collectionRoutes = require("../routes/collectionRoutes");
const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }

  app.use(express.json());
  app.use(cors());
  app.use("/collections/books", bookRoutes);
  app.use("/collector", userRoutes);

  app.use((req, res) => {
    res.status(404).send("Route not found");
  });
};
