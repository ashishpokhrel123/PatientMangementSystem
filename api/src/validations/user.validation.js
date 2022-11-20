const Joi = require("joi");
const userSchema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(8).required(),
});

module.exports = userSchema;
