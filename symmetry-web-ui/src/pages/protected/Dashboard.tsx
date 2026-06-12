import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      Dashboard
      <button onClick={logout} className="btn-primary px-4 ml-4">
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
