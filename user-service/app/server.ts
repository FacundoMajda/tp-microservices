import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { Logger } from '../utils/logger';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';

const app = express();
const port = process.env.USER_SERVICE_PORT || 3002;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
  initializeDatabase();
  initializeModels();
  Logger.dbConnection('success');
} catch (error) {
  Logger.dbConnection('error', error);
}

app.get('/', (_req, res) => {
  res.send('User Service Status: OK');
});

app.get('/health', setupHealthCheck('User Service'));

// Middlewares de error
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
