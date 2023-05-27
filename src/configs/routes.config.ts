import dotenv from "dotenv";
dotenv.config();

interface RouteConfig {
  routePath: any | undefined;
}
let routeConfig: RouteConfig;

routeConfig = {
  routePath: {
    customer: `/${process.env.API_VERSION_1}/customer`,
    employee: `/${process.env.API_VERSION_1}/employee`,
  },
};

export default routeConfig;
