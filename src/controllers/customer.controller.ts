import { Request, Response } from "express";

export const getAllCustomers = (req: Request, res: Response) => {
  // console.log(db.users);

  res.send("Get all customers");
};
