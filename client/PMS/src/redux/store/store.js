import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import patientReducer from "../reducers/patientReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
    patient: patientReducer,
  },
});
