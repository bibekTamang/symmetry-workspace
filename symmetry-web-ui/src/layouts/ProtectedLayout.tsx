import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/AuthTypes";
import Spinner from "../components/common/loaders/Spinner";

interface ProtectedLayoutProps {
  allowedRoles?: UserRole[];
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  allowedRoles,
}) => {
  const { accessToken, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Spinner />;

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
