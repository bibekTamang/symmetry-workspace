import React from "react";
import { Navigate, useLocation } from "react-router";
import type { UserRole } from "../types/AuthTypes";
import Spinner from "../components/common/loaders/Spinner";
import { useAppSelector } from "../hooks/reduxHooks";
import { AdminLayout } from "./AdminLayout";
import { StandardLayout } from "./StandardLayout";

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

  if (!accessToken || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  const isAdminLayout = ["gym_admin", "super_admin"].includes(user.role);

  return isAdminLayout ? (
    <AdminLayout userRole={user.role} />
  ) : (
    <StandardLayout />
  );
};
