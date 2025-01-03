import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import LogIn from "@/components/auth/LogIn";
import SignUp from "@/components/auth/SignUp";
import ForgetPassword from "@/components/auth/ForgetPassword";
import PrivateRoute from "@/layouts/PrivateRoute";
import Profile from "@/pages/Profile";
import PublicRoute from "@/layouts/PublicRoute";
import Home from "@/pages/Home";
import OTP from "@/components/auth/OTP";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LogIn />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/verify-email",
            element: <OTP />,
          },
          {
            path: "/forgetpassword",
            element: <ForgetPassword />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
