const bcrypt = require("bcryptjs");
// model imports
const logger = require("./logger");

async function hashPsw(password) {
  let hashedPsw;
  try {
    hashedPsw = await bcrypt.hash(password, 12);
  } catch (err) {
    logger.info("Error on password processing", 500);
    return next(error);
  }
  if (hashedPsw) {
    return hashedPsw;
  } else {
    return false;
  }
}

module.exports = hashPsw;
