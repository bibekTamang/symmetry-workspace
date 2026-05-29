import { ProtectedLayout } from "../layouts/ProtectedLayout";

export const protectedRoutes = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div>Dashboard Page (Coming Soon)</div>,
      },
    ],
  },
];
