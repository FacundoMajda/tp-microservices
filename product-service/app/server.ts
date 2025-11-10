import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import productRoutes from '../routes/product.routes';
import { getEventBus } from '@tp-microservices/shared';

const app = express();
const port = process.env.PRODUCT_SERVICE_PORT || 3003;
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
    console.log('Product Service DB initialized');
  } catch (error) {
    console.log('Product Service DB init failed', error);
  }

  try {
    await eventBus.connect();
    console.log('✅ Product Service connected to EventBus');
  } catch (error) {
    console.error('❌ Failed to connect to EventBus:', error);
  }
}

initialize();

app.get('/', (_req, res) => {
  res.send('Product Service Status: OK');
});

app.use('/products', productRoutes);

app.get('/health', setupHealthCheck('Product Service'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Product Service running on port ${port}`);
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
