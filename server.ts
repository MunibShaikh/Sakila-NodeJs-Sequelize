import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import DatabaseConn from "./src/providers/db.provider";
import { registerRoutes } from "./src/routes/route.loader";
dotenv.config();

const db = new DatabaseConn();
db.createDBConnection();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const loadRoutes = async () => {
  const routePaths = [
    "./customer.route.ts",
    "./employee.route.ts",
    // Add more route paths as needed
  ];

  await registerRoutes(app, routePaths);
};

loadRoutes().catch((error) => {
  console.error("Error loading routes:", error);
});

// Enable CORS
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port || 3500, () => {
  console.log(`Server listening on port ${port}`);
});
