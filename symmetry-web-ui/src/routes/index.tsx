import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import PageNotFound from "../pages/public/PageNotFound";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
