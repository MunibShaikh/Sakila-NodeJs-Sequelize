import { Request, Response } from "express";

export const getAllCustomers = (req: Request, res: Response) => {
  res.send("Get all customers");
};
