const httpStatus = require("http-status");
const userService = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");

const signup = catchAsync(async (req, res) => {
  const reqUser = req.body;
  const user = await userService.createUser(reqUser);
  res.status(httpStatus.CREATED).send(user);
});

const signin = catchAsync(async (req, res) => {
  const user = await userService.signin(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  signup,
  signin,
};
