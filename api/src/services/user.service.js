const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const createUserValidation = require("../validations/user.validation");
const verifyToken = require("../middleware/auth");

/** 
  Get User By Email
  * @param(string) email
  * @returns {Promise<User>}
*/

const getUserByEmail = async (email) => {
  console.log(email);
  return await User.findOne({ email: email });
};

/** 
  *signup
  *@param(Object) userBody
  * @returns {Promise<User>}
 
 */
const signup = async (userBody) => {
  const user = await getUserByEmail(userBody.email);
  if (user !== null) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email Already Exist");
  }
  let newUser = new User(userBody);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  newUser.save();
  return newUser;
};

/**  login
 * @param(object) userBody
 * @returns {Promise<User>}
 */
const signin = async (userBody) => {
  const user = await getUserByEmail(userBody.email);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email does not Exist");
  }

  const validPassword = await bcrypt.compare(userBody.password, user.password);
  if (!validPassword)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password does not match");

  const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
  return { message: "Login Successful", token: token };
};
/* profile */

// const profile = verifyToken, async(id) => {
//   const user = User.findById(id);
//   return user;

// }

module.exports = { signup, signin };
