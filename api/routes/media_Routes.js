const express = require("express");
const morgan = require("morgan");
const router = express.Router();
// middle
const asyncMiddleware = require("../middleware/async");
// control
const mediaCollectionControl = require("../controller/mediaCollectionControl");
const logger = require("../utils/logger");

if (process.env.NODE_ENV === "development") {
  logger.info("Book router on");
  router.use(morgan("tiny"));
}

router.get("/getAll", asyncMiddleware(mediaCollectionControl.getAll));

router.get("/getOne/:id", asyncMiddleware(mediaCollectionControl.getOneItem));

router.get("/getByAuthor", asyncMiddleware(mediaCollectionControl.getByAuthor));

router.get(
  "/getByCollectorId/:id",
  asyncMiddleware(mediaCollectionControl.getByCollectorId)
);

router.post("/addNewItem", asyncMiddleware(mediaCollectionControl.addNewItem));

router.patch(
  "/updateItem/:id",
  asyncMiddleware(mediaCollectionControl.updateItem)
);

router.delete(
  "/deleteItem/:id",
  asyncMiddleware(mediaCollectionControl.deleteItem)
);

module.exports = router;
