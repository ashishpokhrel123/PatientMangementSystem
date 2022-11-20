const config = require("../config/keys");
const jwt = require("jsonwebtoken");
const secretKey = config.jwt.secret;

const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    let err = new Error("Bearer token is not set!");
    err.status = 401;
    return next(err);
  }
  let token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
