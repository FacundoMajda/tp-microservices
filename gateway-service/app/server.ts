import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { initializeDatabase } from '../config';
import { errorMiddleware, loggingMiddleware, notFoundMiddleware, setupProxyMiddlewares } from '../middlewares';
import { Logger } from '../utils/logger';

const app = express();
const port = process.env.GATEWAY_SERVICE_PORT || 3000;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
  initializeDatabase();
  Logger.dbConnection('success');
} catch (error) {
  Logger.dbConnection('error', error);
}
setupProxyMiddlewares(app);

app.get('/', (_req, res) => {
  res.send('Gateway Service Status: OK');
});

app.get('/health', async (_req, res) => {
  try {
    const services = [
      { name: 'auth', url: 'http://auth:3000/health' },
      { name: 'user', url: 'http://user:3000/health' },
      { name: 'product', url: 'http://product:3000/health' },
    ];

    Logger.info('---------Starting health checks for all services---------');

    const results = await Promise.all(
      services.map(async (service) => {
        try {
          Logger.info(`Health checking ${service.name} at ${service.url}`);
          const response = await fetch(service.url);
          const status = response.ok ? 'healthy' : 'unhealthy';
          Logger.info(`${service.name} health: ${status}`);
          return { service: service.name, status };
        } catch (error) {
          Logger.error(`${service.name} health check failed: ${String(error)}`);
          return { service: service.name, status: 'unhealthy', error: String(error) };
        }
      }),
    );

    const allHealthy = results.every((r) => r.status === 'healthy');
    Logger.info(`---------Overall health: ${allHealthy ? 'healthy' : 'unhealthy'}---------`);
    res.status(allHealthy ? 200 : 503).json({ status: allHealthy ? 'healthy' : 'unhealthy', services: results });
  } catch (error) {
    Logger.error(`Health check error: ${String(error)}`);
    res.status(503).json({ status: 'unhealthy', error: String(error) });
  }
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
