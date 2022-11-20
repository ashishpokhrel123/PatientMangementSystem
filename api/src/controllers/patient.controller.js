const httpStatus = require("http-status");
const patientService = require("../services/patient.service");
const catchAsync = require("../utils/catchAsync");

const addPatient = catchAsync(async (req, res) => {
  const patient = await patientService.addPatient(req.body);
  res.status(httpStatus.CREATED).send(patient);
});

const getPatient = catchAsync(async (req, res) => {
  const patient = await patientService.getPatient();
  res.status(httpStatus.OK).send(patient);
});

const getPatientById = catchAsync(async (req, res) => {
  const patient = await patientService.getPatientById(req.params);
  res.status(httpStatus.OK).send(patient);
});

const updatePatient = catchAsync(async (req, res) => {
  const patient = await patientService.updatePatient(req.body);
  res.status(httpStatus.CREATED).send(patient);
});

const deletePatient = catchAsync(async (req, res) => {
  const patient = await patientService.deletePatient(req.params);
  res.status(httpStatus.OK).send(patient);
});

const markPatientAsSpecialAttention = catchAsync(async (req, res) => {
  console.log(req.body, "request");
  const patient = await patientService.markSpecialAttention(req.body);
  res.status(httpStatus.OK).send(patient);
});

module.exports = {
  addPatient,
  getPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  markPatientAsSpecialAttention,
};
