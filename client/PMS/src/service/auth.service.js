import axios from "axios";

let API_URL = "http://localhost:3001/v1/users/";

const signup = (email, password) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

const signin = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  signup,
  signin,
  logout,
  getCurrentUser,
};

export default AuthService;
