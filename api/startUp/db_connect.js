require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
/// variables
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const logger = require("../utils/logger");

module.exports = function () {
  /// data
  const mongooseURI =
    process.env.NODE_ENV === "test"
      ? process.env.MONGOOSE_TEST_DB
      : process.env.MONGOOSE_URI;
  // const mongooseURI = process.env.MONGOOSE_URI;
  const mongooseOptions =
    process.env.NODE_ENV === "test"
      ? { useNewUrlParser: true, useUnifiedTopology: false }
      : { useNewUrlParser: true, useUnifiedTopology: true };

  ///Connection
  mongoose
    .connect(mongooseURI, mongooseOptions)
    .then(() => {
      logger.info("Mongo Connected to: " + mongooseURI + "\n");
    })
    .catch((err) =>
      logger.error(
        "Error on connection to:\n",
        mongooseURI,
        "\n Error: \n",
        err
      )
    );
};
