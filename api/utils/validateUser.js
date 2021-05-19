const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// log
const logger = require("./logger");

function validateUser(data) {
  logger.info("Request for validation");
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  const isValid = schema.validate(data);
  if (isValid.error) {
    result = isValid.error.details[0].message;
    logger.error("error on validation", result);
    return result;
  }
  logger.info("valid input");
  return false;
}

module.exports = validateUser;
