import { ProtectedLayout } from "../layouts/ProtectedLayout";
import Dashboard from "../pages/protected/Dashboard";
import WorkoutPlans from "../pages/protected/WorkoutPlans";

export const protectedRoutes = [
  {
    element: <ProtectedLayout allowedRoles={["gym_admin", "super_admin"]} />,
    children: [
      {
        path: "/gym/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    element: <ProtectedLayout allowedRoles={["gym_admin"]} />,
    children: [
      {
        path: "/gym/members",
        element: <div>Gym Membership Roster Management View</div>,
      },
      {
        path: "/gym/workout-plans",
        element: <WorkoutPlans />,
      },
    ],
  },
  {
    element: <ProtectedLayout allowedRoles={["super_admin"]} />,
    children: [
      {
        path: "/admin/gyms",
        element: <div>System Gyms Management View</div>,
      },
    ],
  },
];
