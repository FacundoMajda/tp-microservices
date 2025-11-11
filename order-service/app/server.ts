import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';
import { loggingMiddleware, notFoundMiddleware, errorMiddleware } from '../middlewares';
import { setupHealthCheck } from '../utils/health';
import orderRoutes from '../routes/order.routes';
import { getEventBus } from '@tp-microservices/shared';
import { UserSubscriber, ProductSubscriber, PaymentSubscriber } from '../subscribers';
import { OrderRepository } from '../repository/order.repository';
import { OrderService } from '../services/order.service';

const app = express();
const port = process.env.PORT || 3000;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Inicializar base de datos y modelos
try {
  initializeDatabase();
  initializeModels();
  console.log('Order Service DB initialized');
} catch (error) {
  console.log('Order Service DB init failed', error);
}

// Conectar EventBus y inicializar subscribers
const eventBus = getEventBus();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const userSubscriber = new UserSubscriber(eventBus);
const productSubscriber = new ProductSubscriber(eventBus);
const paymentSubscriber = new PaymentSubscriber(eventBus, orderService);

(async () => {
  try {
    // Conectar a RabbitMQ
    await eventBus.connect();
    console.log('✅ EventBus connected to RabbitMQ');

    // Inicializar subscribers
    await userSubscriber.initialize();
    await productSubscriber.initialize();
    await paymentSubscriber.initialize();
    console.log('✅ Event subscribers initialized');
    console.log('✅ Order Service connected to EventBus');
  } catch (error) {
    console.error('❌ Failed to connect to RabbitMQ:', error);
  }
})();

app.get('/', (_req, res) => {
  res.send('Order Service Status: OK');
});

app.use('/orders', orderRoutes);

app.get('/health', setupHealthCheck('Order Service'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Order Service running on port ${port}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} signal received: closing HTTP server`);

  // Desconectar EventBus
  try {
    await eventBus.disconnect();
    console.log('✅ EventBus connection closed');
  } catch (error) {
    console.error('Error disconnecting EventBus:', error);
  }

  // Cerrar servidor HTTP
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });

  // Forzar cierre después de 10 segundos
  setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
