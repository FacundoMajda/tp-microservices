import { Request, Response } from 'express';
import { Logger } from './logger';

export const setupHealthCheck = (serviceName: string, dbCheck?: () => Promise<boolean>, intervalMs = 30000) => {
  const endpoint = async (_req: Request, res: Response) => {
    const dbOk = dbCheck ? await dbCheck().catch(() => false) : true;
    res.status(dbOk ? 200 : 500).json({
      status: dbOk ? 'ok' : 'error',
      service: serviceName,
      database: dbOk ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    });
  };

  setInterval(async () => {
    const dbOk = dbCheck ? await dbCheck().catch(() => false) : true;
    Logger.info(`HealthCheck - ${serviceName}`, {
      status: dbOk ? 'ok' : 'error',
      database: dbOk ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    });
  }, intervalMs);

  return endpoint;
};
