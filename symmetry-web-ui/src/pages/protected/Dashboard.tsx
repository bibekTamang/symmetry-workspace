import { logout } from "../../redux/features/auth/authThunk";
import { useAppDispatch } from "../../hooks/reduxHooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <div>
      Dashboard
      <button className="btn-primary px-4 ml-4" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
