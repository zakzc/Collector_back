const express = require("express");
const morgan = require("morgan");
const router = express.Router();
// middle
const asyncMiddleware = require("../middleware/async");
// control
const bookCollectionControl = require("../controller/bookCollectionControl");
const logger = require("../utils/logger");

if (process.env.NODE_ENV === "development") {
  logger.info("Book router on");
  router.use(morgan("tiny"));
}

router.get("/getAll", asyncMiddleware(bookCollectionControl.getAll));

router.get("/getOne/:id", asyncMiddleware(bookCollectionControl.getOneItem));

router.get("/getByAuthor", asyncMiddleware(bookCollectionControl.getByAuthor));

router.get(
  "/getByCollectorId/:id",
  asyncMiddleware(bookCollectionControl.getByCollectorId)
);

router.post("/addNewItem", asyncMiddleware(bookCollectionControl.addNewItem));

router.put(
  "/updateItem/:id",
  asyncMiddleware(bookCollectionControl.updateItem)
);

router.delete(
  "/deleteItem/:id",
  asyncMiddleware(bookCollectionControl.deleteItem)
);

module.exports = router;
