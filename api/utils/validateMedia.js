const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const logger = require("./logger");

function validateMedia(data) {
  logger.info(
    "Validation request for:\n" +
      data.typeOfMedia +
      data.author +
      data.subType +
      data.mediaID +
      data.quantity +
      data.sellable +
      data.dateOfPurchase +
      data.price
  );
  const schema = Joi.object({
    collector: Joi.objectId(),
    typeOfMedia: Joi.string().min(2).max(15).required(),
    subType: Joi.string().min(2).max(15).required(),
    title: Joi.string().min(3).max(150).required(),
    author: Joi.string().min(3).max(150).required(),
    mediaID: Joi.string().min(3).max(50).required(),
    quantity: Joi.number().required(),
    sellable: Joi.boolean().required(),
    dateOfPurchase: Joi.date().min(1).required(),
    price: Joi.number().required(),
    details: Joi.string().max(250),
    notes: Joi.string().max(250),
  });
  const isValid = schema.validate(data);
  if (isValid.error) {
    result = isValid.error;
    logger.info("\nError on validation\n", result);
    return { valid: false, message: result };
  }
  logger.info("- Valid");
  return { valid: true };
}

module.exports = validateMedia;
