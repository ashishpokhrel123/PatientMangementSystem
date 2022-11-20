const createHttpError = require("http-errors");
const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");
const Validators = require("../validations");

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error.isJoi)
        return next(createHttpError(422, { message: error.message }));
      next(createHttpError(500));
    }
  };
};
