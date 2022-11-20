import axios from "axios";

let API_URL = "http://localhost:3001/v1/patient/";

const addPatient = (data) => {
  console.log(data, "allddd");
  const response = axios.post(API_URL, {
    //basic information
    fullName: data.fullName,
    email: data.email,
    contactNo: data.contactNo,
    dob: data.dob,
    address: data.address,
    images: data.images,
  });

  return response;
};

const getPatient = async () => {
  const result = await axios.get(API_URL);
  return result?.data;
  console.log(result, "result");
};

const getPatientById = async (id) => {
  console.log(API_URL + `${id}}`, "route");
  const result = await axios.get(API_URL + `${id}`);
  console.log(result);
  return result?.data;
};

const updatePatientById = (id, data) => {
  const response = axios.put(API_URL + `${id}`, {
    //basic information
    id: id,
    fullName: data.fullName,
    email: data.email,
    contactNo: data.contactNo,
    dob: data.dob,
    address: data.address,
    images: data.images,
  });

  return response;
};

const deletePatientById = (id) => {
  return axios.get(API_URL + `${id}`).then((response) => {
    if (response.data.email) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }

    return response.data;
  });
};

const PatientService = {
  addPatient,
  getPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
};

export default PatientService;
