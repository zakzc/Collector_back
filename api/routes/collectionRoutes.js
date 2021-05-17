const express = require("express");
const morgan = require("morgan");
const router = express.Router();
// middle
const asyncMiddleware = require("../middleware/async");
// control
const collectionControl = require("../controller/collectionControl");
const logger = require("../utils/logger");

if (process.env.NODE_ENV === "development") {
  logger.info("Collection routes on");
  router.use(morgan("tiny"));
}

router.get("/getAll", asyncMiddleware(collectionControl.getAll));

router.get("/test", function (req, res) {
  logger.info("Get all");
  res.send("Hello again!");
});

module.exports = router;
