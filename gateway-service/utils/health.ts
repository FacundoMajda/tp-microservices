import { Request, Response } from 'express';
import { Logger } from './logger';

/**
 * Función para verificar el estado de la base de datos
 */
export type DbCheckFunction = () => Promise<boolean>;

/**
 * Crea un endpoint de healthcheck y un cron automático.
 * @param serviceName Nombre del servicio
 * @param dbCheck Función opcional para verificar DB (debe retornar Promise<boolean>)
 * @param intervalMs Intervalo en ms para log automático (default 30s)
 */
export const setupHealthCheck = (
  serviceName: string,
  dbCheck?: DbCheckFunction,
  intervalMs = 30000
) => {
  // REST endpoint
  const healthEndpoint = async (_req: Request, res: Response) => {
    let dbStatus: 'ok' | 'error' | 'n/a' = 'n/a';
    let overallStatus: 'ok' | 'error' = 'ok';
    let statusCode = 200;

    if (dbCheck) {
      try {
        const isDbHealthy = await dbCheck();
        dbStatus = isDbHealthy ? 'ok' : 'error';
        if (!isDbHealthy) {
          overallStatus = 'error';
          statusCode = 500;
        }
      } catch {
        dbStatus = 'error';
        overallStatus = 'error';
        statusCode = 500;
      }
    }

    const healthData = {
      status: overallStatus,
      service: serviceName,
      timestamp: new Date().toISOString(),
      database: dbStatus,
    };

    res.status(statusCode).json(healthData);
  };

  // Cron de logging automático
  setInterval(async () => {
    let dbStatus: 'ok' | 'error' | 'n/a' = 'n/a';
    let overallStatus: 'ok' | 'error' = 'ok';

    if (dbCheck) {
      try {
        const isDbHealthy = await dbCheck();
        dbStatus = isDbHealthy ? 'ok' : 'error';
        if (!isDbHealthy) {
          overallStatus = 'error';
        }
      } catch {
        dbStatus = 'error';
        overallStatus = 'error';
      }
    }

    Logger.info(`HealthCheck - ${serviceName}`, {
      status: overallStatus,
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  }, intervalMs);

  return healthEndpoint;
};

/**
 * Función helper para crear un DbCheck usando Sequelize
 */
export const createSequelizeDbCheck = (sequelize: any): DbCheckFunction => {
  return async (): Promise<boolean> => {
    try {
      await sequelize.authenticate();
      return true;
    } catch {
      return false;
    }
  };
};

/**
 * Función helper para servicios sin DB
 */
export const noDbCheck = (): DbCheckFunction => {
  return async (): Promise<boolean> => true; // Siempre healthy si no hay DB
};