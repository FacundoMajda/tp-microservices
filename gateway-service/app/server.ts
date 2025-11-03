import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import { initializeDatabase } from '../config';

const app = express();
const port = process.env.GATEWAY_SERVICE_PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
initializeDatabase();

// Proxy Services
app.use(
  '/auth',
  createProxyMiddleware({
    target: `${process.env.AUTH_SERVICE_URL}:${process.env.AUTH_SERVICE_PORT}` || 'http://localhost:3001',
    changeOrigin: true,
  }),
);
app.use(
  '/users',
  createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}` || 'http://localhost:3002',
    changeOrigin: true,
  }),
);

// Routes
app.get('/', (_req, res) => {
  res.send('Gateway Service Status: OK');
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Gateway service is running on port ${port}`);
});
