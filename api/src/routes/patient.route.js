const express = require("express");
const patientController = require("../controllers/patient.controller");
const verifyToken = require("../middleware/auth");
const Validator = require("../middleware/validate");

const router = express.Router();

router.route("/").post(patientController.addPatient);
router.route("/").get(patientController.getPatient);
router.route("/:id").get(patientController.getPatientById);
router.route("/:id").put(patientController.updatePatient);
router.route("/:id").put(patientController.markPatientAsSpecialAttention);
router.route("/:id").delete(patientController.deletePatient);

module.exports = router;
