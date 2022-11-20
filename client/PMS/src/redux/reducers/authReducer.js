import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../../service/auth.service";

const initialState = {
  token: "",
  loading: false,
  error: "",
  isLoggedIn: false,
  
};

export const signUp = createAsyncThunk("signup", async (email, password) => {
  const result = AuthService.signup(email, password);
  return result;
});

export const signIn = createAsyncThunk(
  "signin",
  async ({ email, password }) => {
    const result = AuthService.signin(email, password);
    return result;
  }
);

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
      if (state.token) {
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: {
    [signUp.rejected]: (state, { payload: { error, message } }) => {
      state.loading = false;
      if (error) {
        console.log(error);
        state.error = error;
      } else {
        state.message = message;
      }
    },
    [signUp.pending]: (state, { payload: { error, message } }) => {
      state.loading = false;
    },

    [signUp.fulfilled]: (state, { payload: { error, message } }) => {
      state.loading = true;
    },

    [signIn.fulfilled]: (state, { payload: { error, token } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
  },
});

export const { addToken } = authReducer.actions;
export default authReducer.reducer;
