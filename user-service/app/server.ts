import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { Logger } from '../utils/logger';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { UserSeeder } from '../seeders/user.seeder';
import { setupHealthCheck } from '../utils/health';
import userRoutes from '../routes/user.routes';
import { getEventBus } from '@tp-microservices/shared';

const app = express();
const port = process.env.USER_SERVICE_PORT || 3002;
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
    console.log('✅ User Service database synchronized');

    // Seed initial data
    await UserSeeder.seed();
  } catch (error) {
    Logger.dbConnection('error', error);
  }

  try {
    await eventBus.connect();
    console.log('✅ User Service connected to EventBus');
  } catch (error) {
    console.error('❌ Failed to connect to EventBus:', error);
  }
}

initialize();

app.get('/', (_req, res) => {
  res.send('User Service Status: OK');
});

app.use('/users', userRoutes);

app.get('/health', setupHealthCheck('User Service'));

// Middlewares de error
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  Logger.serverStart(Number(port));
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await eventBus.disconnect();
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await eventBus.disconnect();
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
