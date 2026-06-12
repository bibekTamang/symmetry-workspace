import { ProtectedLayout } from "../layouts/ProtectedLayout";
import Dashboard from "../pages/protected/Dashboard";

export const protectedRoutes = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
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
    ],
  },
];
