import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PublicRoute;
