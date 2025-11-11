import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import paymentRoutes from '../routes/payment.routes';
import { getEventBus } from '@tp-microservices/shared';
import { OrderSubscriber } from '../subscribers/order.subscriber';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentService } from '../services/payment.service';

const app = express();
const port = process.env.PAYMENT_SERVICE_PORT || 3005;
const eventBus = getEventBus();
const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository);
const orderSubscriber = new OrderSubscriber(eventBus, paymentService);

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
    console.log('Payment Service DB initialized');
  } catch (error) {
    console.log('Payment Service DB init failed', error);
  }

  try {
    await eventBus.connect();
    await orderSubscriber.initialize();
    console.log('✅ Payment Service connected to EventBus');
  } catch (error) {
    console.error('❌ Failed to connect to EventBus:', error);
  }
}

initialize();

app.get('/', (_req, res) => {
  res.send('Payment Service Status: OK');
});

app.use('/payments', paymentRoutes);

app.get('/health', setupHealthCheck('Payment Service'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Payment Service running on port ${port}`);
});
