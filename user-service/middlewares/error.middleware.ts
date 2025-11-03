import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export const notFoundMiddleware = (_req: Request, res: Response): void => {
  Logger.warn('Ruta no encontrada', { url: _req.originalUrl, method: _req.method });
  res.status(404).json({ error: 'Not Found' });
};

export const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  Logger.error('Error interno del servidor', {
    error: err.message,
    stack: err.stack,
    url: _req.originalUrl,
    method: _req.method,
  });
  res.status(500).json({ error: 'Internal Server Error' });
};
