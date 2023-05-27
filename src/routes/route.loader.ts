import { Express, Router } from "express";
interface RouteModule {
  default: (router: Router) => void;
}

export const registerRoutes = async (app: Express, routePaths: string[]) => {
  for (const routePath of routePaths) {
    try {
      const { default: routeModule } = await import(routePath);
      const router = Router();
      routeModule(router);
      app.use(router);
    } catch (error) {
      console.error(`Error importing route from "${routePath}":`, error);
    }
  }
};
