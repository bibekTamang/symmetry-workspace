import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import AuthLayout from "../layouts/AuthLayout";

// Simple visual layout wrapper for auth flow screens

export const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
];
