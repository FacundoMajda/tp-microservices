import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import orderRoutes from '../routes/order.routes';

const app = express();
const port = process.env.ORDER_SERVICE_PORT || 3004;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
  initializeDatabase();
  initializeModels();
  console.log('Order Service DB initialized');
} catch (error) {
  console.log('Order Service DB init failed', error);
}

app.get('/', (_req, res) => {
  res.send('Order Service Status: OK');
});

app.use('/orders', orderRoutes);

app.get('/health', setupHealthCheck('Order Service'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Order Service running on port ${port}`);
});
