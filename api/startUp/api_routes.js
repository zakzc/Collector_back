const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// middle
const serverError = require("../middleware/serverError");
// routes
// const collectionRoutes = require("../routes/collectionRoutes");
const mediaRoutes = require("../routes/media_Routes");
const userRoutes = require("../routes/userRoutes");
// authentication
const auth = require("../middleware/auth");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }

  app.use(express.json());
  app.use(cors());
  //app.use("/collections", mediaRoutes);
  app.use("/collections", auth, mediaRoutes);
  app.use("/collectors", userRoutes);

  app.use((req, res) => {
    res.status(404).send("Route not found");
  });
};
