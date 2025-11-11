import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import productRoutes from '../routes/product.routes';
import { getEventBus } from '@tp-microservices/shared';
import { OrderSubscriber } from '../subscribers/order.subscriber';
import { ProductSeeder } from '../seeders/product.seeder';
import { ProductRepository } from '../repository/product.repository';
import { ProductService } from '../services/product.service';

const app = express();
const port = process.env.PRODUCT_SERVICE_PORT || 3003;
const eventBus = getEventBus();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const orderSubscriber = new OrderSubscriber(eventBus, productService);

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

    // Seed initial data
    await ProductSeeder.seed();
  } catch (error) {
    console.log('Product Service DB init failed', error);
  }

  try {
    await eventBus.connect();
    await orderSubscriber.initialize();
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
