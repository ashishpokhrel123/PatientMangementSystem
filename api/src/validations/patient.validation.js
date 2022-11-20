const Joi = require("joi");
const patientSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  contactNo: Joi.string().required(),
  dob: Joi.date().required(),
  address: Joi.string(),
  images: Joi.string(),
});

module.exports = patientSchema;
