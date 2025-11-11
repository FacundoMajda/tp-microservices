import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

import { initializeDatabase, initializeModels } from '../config';
import { errorMiddleware, loggingMiddleware, notFoundMiddleware } from '../middlewares';
import authRoutes from '../routes/auth.routes';
import { setupHealthCheck } from '../utils/health';
import { Logger } from '../utils/logger';
import { getEventBus } from '@tp-microservices/shared';

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3001;
const eventBus = getEventBus();

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize database and EventBus
async function initialize() {
  try {
    initializeDatabase();
    initializeModels();
    Logger.dbConnection('success');
  } catch (error) {
    Logger.dbConnection('error', error);
  }

  try {
    await eventBus.connect();
    console.log('✅ Auth Service connected to EventBus');
  } catch (error) {
    console.error('❌ Failed to connect to EventBus:', error);
  }
}

initialize();

app.get('/', (_req, res) => {
  res.send('Auth Service Status: OK');
});

app.get('/health', setupHealthCheck('Auth Service'));
app.use('/auth', authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  Logger.serverStart(Number(port));
});
