import { Outlet } from "react-router";

const AuthLayout: React.FC = () => (
  <div className="auth-container-split-grid">
    <Outlet />
  </div>
);

export default AuthLayout;
