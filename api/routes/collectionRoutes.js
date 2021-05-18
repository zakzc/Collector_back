const express = require("express");
const morgan = require("morgan");
const router = express.Router();
// middle
const asyncMiddleware = require("../middleware/async");
// control
const collectionControl = require("../controller/collectionControl");
const logger = require("../utils/logger");

if (process.env.NODE_ENV === "development") {
  router.use(morgan("tiny"));
}

router.get("/getAll", asyncMiddleware(collectionControl.getAll));

router.get("/getOne/:id", asyncMiddleware(collectionControl.getOneItem));

router.post("/addNewItem", asyncMiddleware(collectionControl.addNewItem));

router.put("/updateItem/:id", asyncMiddleware(collectionControl.updateItem));

router.delete("/deleteItem/:id", asyncMiddleware(collectionControl.deleteItem));

module.exports = router;
