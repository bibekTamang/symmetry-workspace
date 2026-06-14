import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import type { UserRole } from "../types/AuthTypes";
import Spinner from "../components/common/loaders/Spinner";
import { useAppSelector } from "../hooks/reduxHooks";

interface ProtectedLayoutProps {
  allowedRoles?: UserRole[];
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  allowedRoles,
}) => {
  const { accessToken, user, isLoading } = useAppSelector(
    (state) => state.auth,
  );
  const location = useLocation();

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );

  if (!accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
