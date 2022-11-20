const express = require("express");
const Validator = require("../middleware/validate");
const userController = require("../controllers/user.controller");
const {
  userValidationRules,
  validate,
} = require("../validations/user.validation");

const router = express.Router();

router
  .route("/signup")
  .post(Validator("userValidation"), userController.signup);

router
  .route("/signin")
  .post(Validator("userValidation"), userController.signin);

module.exports = router;
