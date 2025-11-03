import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (_req: Request, _res: Response, next: NextFunction): void => {
  next();
};
