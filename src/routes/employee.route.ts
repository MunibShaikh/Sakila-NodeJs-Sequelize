import { Router } from "express";
import { getAllEmployees } from "../controllers/employee.controller";
import routeConfig from "../configs/routes.config";
const routePath = routeConfig.routePath.employee;
// const employeeRoutes = Router();
// employeeRoutes.get("/", getAllEmployees);

const employeeRoutes = (router: Router) => {
  router.get(`${routePath}/getAllEmployees`, getAllEmployees);
};

export default employeeRoutes;
