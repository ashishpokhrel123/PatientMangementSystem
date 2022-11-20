const express = require("express");

const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const routes = require("./routes/");
const config = require("./config/keys");
const cors = require("cors");

const connectionDb = require("./db/database");
const { errorConverter, errorHandler } = require("./middleware/error");
const app = express();

// port
const port = require("./config/keys").port;

// parse json request body
app.use(express.json());

//cors
app.options("*", cors());
app.use(cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//connect MongoDb
connectionDb();

//api routes
app.use("/v1", routes);

//send back 404 error if request not found
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

//convert error to  ApiError
app.use(errorConverter);

//handling error
app.use(errorHandler);

// connecting to server

app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = app;
