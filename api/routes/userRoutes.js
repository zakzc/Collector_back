const express = require("express");
const router = express.Router();
const morgan = require("morgan");
// middle
const asyncMiddleware = require("../middleware/async");
// controls
const userControl = require("../controller/userControl");
// utils
const logger = require("../utils/logger");

if (process.env.NODE_ENV === "development") {
  router.use(morgan("tiny"));
}

router.post("/register", asyncMiddleware(userControl.registerUser));

router.post("/login", asyncMiddleware(userControl.logIn));

router.get("/whoami", asyncMiddleware(userControl.getCurrentUser));

module.exports = router;
