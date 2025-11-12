import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export const setupProxyMiddlewares = (app: Application): void => {
  // Auth service - keep /auth prefix by rewriting
  app.use(
    '/auth',
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: (path) => `/auth${path}`, // Preserve /auth prefix
    }),
  );

  // User service - keep /users prefix
  app.use(
    '/users',
    createProxyMiddleware({
      target: process.env.USER_SERVICE_URL || 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: (path) => `/users${path}`, // Preserve /users prefix
    }),
  );

  // Product service - keep /products prefix
  app.use(
    '/products',
    createProxyMiddleware({
      target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: (path) => `/products${path}`, // Preserve /products prefix
    }),
  );

  // Order service - keep /orders prefix
  app.use(
    '/orders',
    createProxyMiddleware({
      target: process.env.ORDER_SERVICE_URL || 'http://localhost:3004',
      changeOrigin: true,
      pathRewrite: (path) => `/orders${path}`, // Preserve /orders prefix
    }),
  );

  // Payment service - keep /payments prefix
  app.use(
    '/payments',
    createProxyMiddleware({
      target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: (path) => `/payments${path}`, // Preserve /payments prefix
    }),
  );
};
