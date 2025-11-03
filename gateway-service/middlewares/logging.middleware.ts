import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  Logger.request(req.method, req.originalUrl, ip);

  if (req.originalUrl.startsWith('/auth')) {
    Logger.proxyRequest('Auth Service', req.originalUrl);
  } else if (req.originalUrl.startsWith('/users')) {
    Logger.proxyRequest('User Service', req.originalUrl);
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.response(res.statusCode, req.originalUrl, duration);
  });

  next();
};
