const express = require("express");
const userRoute = require("./user.route");
const patientRoute = require("./patient.route");
const uploadRoute = require("./fileUpload.route");
const router = express.Router();
const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/patient",
    route: patientRoute,
  },
  {
    path: "/upload",
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
