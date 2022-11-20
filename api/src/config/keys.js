const dotenv = require("dotenv").config();
const path = require("path");

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  },
  // for google bucket
  bucket: {
    bucketName: process.env.GOOGLE_CLOUD_PROJECT,
    googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
};
