import { Request, Response } from "express";

export const getAllEmployees = (req: Request, res: Response) => {
  res.send("Get all employees");
};
