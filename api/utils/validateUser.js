const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// log
const logger = require("./logger");

function validateUser(data, typeOfValidation) {
  logger.info("Request for validation");
  let schema;
  if (typeOfValidation === "register") {
    schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().min(3).max(255).required().email(),
      password: Joi.string().min(3).max(255).required(),
    });
  } else if (typeOfValidation === "login") {
    schema = Joi.object({
      email: Joi.string().min(3).max(255).required().email(),
      password: Joi.string().min(3).max(255).required(),
    });
  } else {
    return false;
  }
  const isValid = schema.validate(data);
  if (isValid.error) {
    result = isValid.error.details[0].message;
    logger.error("Error on validation", result);
    return false;
  }
  logger.info("valid input");
  return true;
}

module.exports = validateUser;
