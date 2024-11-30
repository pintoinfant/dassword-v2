import type { PathRouteProps } from "react-router-dom";

import Home from "../pages/home";
import App from "../pages/app";

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: "/app",
    element: <App />,
  },
];
