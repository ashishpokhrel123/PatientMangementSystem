import { useState, useEffect, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes, Routes, Route } from "react-router-dom";
import MainRoutes from "./routes/MainRouter";
// import Themeroutes from "./routes/DashBoardRouter";
import { addToken } from "./redux/reducers/authReducer";
import Login from "./views/ui/Auth/Login";
import Register from "./views/ui/Auth/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import EditPatient from "./views/ui/DashBoard/EditPatient";
import Home from "./views/ui/DashBoard/Home";
import PrivateRoute from "./utils/privateRoute";

/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout"));

/***** Pages ****/

// const Starter = lazy(() => import("../views/ui/DashBoard/Home.js"));
const Forms = lazy(() => import("./views/ui/DashBoard/AddPatient"));

const App = () => {
  const ThemeRoutes = useRoutes([
    {
      path: "/",
      element: <FullLayout />,
      children: [
        { path: "/home", exact: true, element: <Home /> },

        { path: "/add", exact: true, element: <Forms /> },

        { path: "/patient/edit/:id", exact: true, element: <EditPatient /> },
      ],
    },
  ]);

  return (
    <div className="dark">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <ProtectedRoute>{ThemeRoutes}</ProtectedRoute>
    </div>
  );
};

export default App;
