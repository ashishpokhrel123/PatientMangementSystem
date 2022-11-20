const Patient = require("../models/patient");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { default: mongoose } = require("mongoose");

/**
 * getPatientById
 * @param(ObjectId) patientId
 * @returns {Promise<Patient>}
 */

const getPatientById = async (patientId) => {
  const { id } = patientId;
  if (!mongoose.Types.ObjectId.isValid(id))
    return new ApiError({ msg: `No task with id :${id}` });
  return await Patient.findById({ _id: id });
};

/**
 * getPatientByEmail
 * @param(email) patientEmail
 * @returns {Promise<Patient>}
 */

const getPatientByEmail = async (patientEmail) => {
  return await Patient.findOne({ email: patientEmail });
};

/** 
*addPatient
*@param(Object) patientBody
* @returns {Promise<Patient>}

*/
const addPatient = async (patientBody) => {
  console.log(patientBody, "body");
  let isEmailTaken = await getPatientByEmail(patientBody.email);
  console.log(await isEmailTaken);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email Already Exist");
  }
  let newPatient = new Patient(patientBody);
  newPatient.save();
  return newPatient;
};

/** 
*getPatient

* @returns {Promise<Patient>}

*/
const getPatient = async () => {
  let patient = Patient.find();
  if (patient) {
    return patient;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "No Patient Found");
  }
};

/** 
*updatePatient
@param {ObjectId} patientId
@param(Object) patientBody
* @returns {Promise<Patient>}

*/
const updatePatient = async (patientBody) => {
  const { id } = patientBody;
  const updatedPatient = Patient.findByIdAndUpdate(
    { _id: id._id },
    { $set: patientBody.id },
    { new: true }
  );
  if (!updatedPatient) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Patient Found");
  }
  return updatedPatient;
};

/** 
*deletePatient
 * @param {ObjectId} patientId
* @returns {Promise<Patient>}

*/
const deletePatient = async (patientId) => {
  const { id } = patientId;
  const deletedPatient = Patient.findByIdAndDelete({ _id: id._id });
  if (!deletedPatient) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Patient Found");
  }
  return deletedPatient;
};

/**
 * mark as Special Attention
 * @param(Object) id
 * @returns {Promise<Patient>}
 */
const markSpecialAttention = async (patientBody) => {
  const { id } = patientBody;
  const updatedPatient = Patient.findByIdAndUpdate(
    { _id: id._id },
    { $set: !isSpecial },
    { new: true }
  );
  if (!updatedPatient) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Patient Found");
  }
  return updatedPatient;
};

module.exports = {
  addPatient,
  getPatient,
  updatePatient,
  deletePatient,
  markSpecialAttention,
  getPatientById,
};
