import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { errorMiddleware, loggingMiddleware, notFoundMiddleware, setupProxyMiddlewares } from '../middlewares';
import { Logger } from '../utils/logger';

const app = express();
const port = process.env.GATEWAY_SERVICE_PORT || 3000;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());

// Setup proxy BEFORE body parsers to avoid consuming the request stream
setupProxyMiddlewares(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Gateway Service Status: OK');
});

app.get('/health', async (req, res) => {
  const startTime = Date.now();
  try {
    const services = [
      { name: 'auth', url: 'http://auth:3001/health' },
      { name: 'user', url: 'http://user:3002/health' },
      { name: 'product', url: 'http://product:3003/health' },
      { name: 'order', url: 'http://order:3004/health' },
      { name: 'payment', url: 'http://payment:3005/health' },
    ];

    Logger.info('Starting health checks for all services');

    const results = await Promise.all(
      services.map(async (service) => {
        const serviceStart = Date.now();
        try {
          const response = await fetch(service.url);
          const latency = Date.now() - serviceStart;
          const status = response.ok ? 'healthy' : 'unhealthy';
          return { name: service.name, status, latency };
        } catch (error) {
          const latency = Date.now() - serviceStart;
          return { name: service.name, status: 'unhealthy', latency, error: String(error) };
        }
      }),
    );

    const duration = Date.now() - startTime;
    const allHealthy = results.every((r) => r.status === 'healthy');
    const overall = allHealthy ? 'healthy' : 'unhealthy';

    Logger.healthCheckSummary(results, overall, `${req.method} ${req.url}`, req.ip || 'unknown', duration);

    res.status(allHealthy ? 200 : 503).json({ status: overall, services: results });
  } catch (error) {
    const duration = Date.now() - startTime;
    Logger.error('Health check error', { error: String(error), duration: `${duration}ms` });
    res.status(503).json({ status: 'unhealthy', error: String(error) });
  }
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
