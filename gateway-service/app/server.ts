import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { initializeDatabase } from '../config';
import { errorMiddleware, loggingMiddleware, notFoundMiddleware, setupProxyMiddlewares } from '../middlewares';
import { Logger } from '../utils/logger';
import { setupHealthCheck } from '../utils/health';

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

app.get('/health', setupHealthCheck('Gateway'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
