const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let uploadFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
