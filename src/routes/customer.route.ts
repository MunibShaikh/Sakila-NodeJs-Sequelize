import { Router } from "express";
import { getAllCustomers } from "../controllers/customer.controller";
import routeConfig from "../configs/routes.config";
const routePath = routeConfig.routePath.customer;
// const customerRoutes = Router();
// customerRoutes.get("/", getAllCustomers);

const customerRoutes = (router: Router) => {
  router.get(`${routePath}/getAllCustomers`, getAllCustomers);
};

export default customerRoutes;
