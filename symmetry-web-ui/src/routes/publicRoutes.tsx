import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AuthLayout from "../layouts/AuthLayout";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";

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
      { path: "email-verify", element: <VerifyOtpPage /> },
    ],
  },
];
