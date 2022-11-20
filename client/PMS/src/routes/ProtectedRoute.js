import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user.token);
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
