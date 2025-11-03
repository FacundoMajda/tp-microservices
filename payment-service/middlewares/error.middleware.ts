import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  res.status(404).json({ error: "Not Found" });
};

export const errorMiddleware = (
  _err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(500).json({ error: "Internal Server Error" });
};
