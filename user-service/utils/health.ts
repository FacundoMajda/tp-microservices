import { Request, Response } from 'express';

export const setupHealthCheck = (serviceName: string, dbCheck?: () => Promise<boolean>) => {
  const endpoint = async (_req: Request, res: Response) => {
    const dbOk = dbCheck ? await dbCheck().catch(() => false) : true;
    res.status(dbOk ? 200 : 500).json({
      status: dbOk ? 'ok' : 'error',
      service: serviceName,
      database: dbOk ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    });
  };

  return endpoint;
};
