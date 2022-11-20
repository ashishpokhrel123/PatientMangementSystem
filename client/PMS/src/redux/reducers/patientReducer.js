import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import PatientService from "../../service/patient.service";
const initialState = {
  status: null,
  error: null,
  message: null,
  loading: null,
  patients: [],
  onePatients: [],
};

export const createPatient = createAsyncThunk("createPatient", async (data) => {
  const result = PatientService.addPatient(data);
  return result;
});

export const fetchPatient = createAsyncThunk("fetchPatient", async () => {
  const result = await PatientService.getPatient();
  return result;
});

export const fetchOnePatient = createAsyncThunk(
  "fetchOnePatient",
  async (id) => {
    const result = await PatientService.getPatientById(id);
    return result;
  }
);

export const updatePatient = createAsyncThunk(
  "updatePatient",
  async (id, fullName, email, contactNo, gender, address, images) => {
    const result = PatientService.updatePatientById(
      id,
      fullName,
      email,
      contactNo,
      gender,
      address,
      images
    );
    return result;
  }
);

export const deletePatient = createAsyncThunk("deletePatient", async (id) => {
  const result = PatientService.deletePatientById(id);
  return result;
});

const patientReducer = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: {
    [createPatient.fulfilled]: (state, action) => {
      state.status = action.payload.status;
    },
    [createPatient.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPatient.fulfilled]: (state, action) => {
      state.patients = action.payload;
    },

    [fetchOnePatient.fulfilled]: (state, action) => {
      state.patients = action.payload;
    },

    [updatePatient.fulfilled]: (state, action) => {
      state.status = action.payload.status;
    },
    [deletePatient.fulfilled]: (state, { payload: { message } }) => {
      const removedPatient = state.filter((item) => {
        return item._id != message._id;
      });
      return removedPatient;
    },
  },
});

export default patientReducer.reducer;
export const getPatients = (state) => state.patient.patients;
export const getOnePatient = (state) => state.patient.onePatients;
export const createPatientStatus = (state) => state.patient.status;
