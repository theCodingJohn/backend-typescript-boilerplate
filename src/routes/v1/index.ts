import express, { Router } from "express";
import authRoute from "./auth.route";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultRoute: IRoute[] = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
