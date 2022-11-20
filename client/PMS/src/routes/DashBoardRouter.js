// import { lazy } from "react";
// import { Navigate, useRoutes } from "react-router-dom";
// import PrivateRoute from "../utils/privateRoute.js";
// import Home from "../views/ui/DashBoard/Home.js";
// import EditPatient from "../views/ui/DashBoard/EditPatient.js";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/ui/DashBoard/Home.js"));
// const Forms = lazy(() => import("../views/ui/DashBoard/AddPatient"));

// /*****Routes******/

// const ThemeRoutes = useRoutes([
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/home", exact: true, element: <Home /> },

//       { path: "/add", exact: true, element: <Forms /> },

//       { path: "/patient/edit/:id", exact: true, element: <EditPatient /> },
//     ],
//   },
// ]);

// export default ThemeRoutes;
