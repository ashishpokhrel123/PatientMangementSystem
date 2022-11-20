const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const uploadFileMiddleware = require("../middleware/upload");
const { Storage } = require("@google-cloud/storage");
const { ApiError } = require("@google-cloud/storage/build/src/nodejs-common");
const GenUuid = require("../utils/generateRandomString");
const sharp = require("sharp");

const storage = new Storage({
  keyFilename: require("../config/keys").bucket.googleApplicationCredentials,
});
const bucket = storage.bucket(require("../config/keys").bucket.bucketName);

const upload = catchAsync(async (req, res) => {
  console.log(req.file);
  await uploadFileMiddleware(req, res);
  if (!req.file) {
    throw new ApiError(httpStatus.NO_CONTENT, "please upload file");
  }

  const fileMetaData = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  };

  const key = GenUuid();
  const newFile = `${key}-${req.file.originalname}`;
  const file = bucket.file(newFile);
  await file.save(req.file.buffer);
  await file.setMetadata({ fileMetaData });
  await file.makePublic();

  const response = { message: "File Upload Successfully", url: newFile };

  return res.json(response);
});

module.exports = { upload };
