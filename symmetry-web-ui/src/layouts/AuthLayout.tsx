import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../hooks/reduxHooks";
import Spinner from "../components/common/loaders/Spinner";
import Brand from "../components/Brand";

interface LocationState {
  from?: {
    pathname: string;
  };
}

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  console.log("isLoading", isLoading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    const customRedirect =
      (location.state as LocationState)?.from?.pathname || "/gym/dashboard";
    return <Navigate to={customRedirect} replace />;
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-[#F8FAFC] h-screen">
        <div className="mx-auto w-full max-w-md bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
          <Brand variant="Dark" className="mb-4" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
