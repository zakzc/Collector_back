const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const logger = require("./logger");

function validateBook(data) {
  logger.info("Validation request for:\n" + typeof data + data);
  const schema = Joi.object({
    collector: Joi.objectId(),
    typeOfMedia: Joi.string().min(1).max(1).required(),
    title: Joi.string().min(3).max(250).required(),
    author: Joi.array().items(Joi.string().min(3).max(150).required()),
    genre: Joi.string().min(3).max(50).required(),
    edition: Joi.number(),
    mediaID: Joi.string().min(3).max(50).required(),
    quantity: Joi.number().required(),
    sellable: Joi.boolean().required(),
    dates: Joi.array()
      .items(
        Joi.object({
          originalReleaseDate: Joi.date(),
          editionDate: Joi.date(),
        })
      )
      .required(),
    price: Joi.array()
      .items(
        Joi.object({
          dateOfEval: Joi.date().min(1).required(),
          marketValue: Joi.number().required(),
          estimatedValue: Joi.number().required(),
          priceTendency: Joi.boolean().required(),
        })
      )
      .required(),
    details: Joi.string().min(3).max(250),
    notes: Joi.string().min(3).max(250),
  });
  const isValid = schema.validate(data);
  if (isValid.error) {
    result = isValid.error.details[0].message;
    logger.info("\nError on validation\n", result);
    return result;
  }
  logger.info("Valid");
  return false;
}

module.exports = validateBook;
