import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import { initializeDatabase, initializeModels } from '../config';

const app = express();
const port = process.env.USER_SERVICE_PORT || 3002;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection and models
initializeDatabase();
initializeModels();

// Routes
app.get('/', (_req, res) => {
  res.send('User Service Status: OK');
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
  console.log(`User Service is running on port ${port}`);
});
