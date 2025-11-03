import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

import { initializeDatabase } from '../config';
import { errorMiddleware, loggingMiddleware, notFoundMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import { Logger } from '../utils/logger';

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3001;

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

app.get('/', (_req, res) => {
  res.send('Auth Service Status: OK');
});

app.get('/health', setupHealthCheck('Auth Service'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
