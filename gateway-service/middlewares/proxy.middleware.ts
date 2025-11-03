import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export const setupProxyMiddlewares = (app: Application): void => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: `${process.env.AUTH_SERVICE_URL || 'http://localhost'}:${process.env.AUTH_SERVICE_PORT || '3001'}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/users',
    createProxyMiddleware({
      target: `${process.env.USER_SERVICE_URL || 'http://localhost'}:${process.env.USER_SERVICE_PORT || '3002'}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/products',
    createProxyMiddleware({
      target: `${process.env.PRODUCT_SERVICE_URL || 'http://localhost'}:${process.env.PRODUCT_SERVICE_PORT || '3003'}`,
      changeOrigin: true,
    }),
  );

  app.use(
    '/orders',
    createProxyMiddleware({
      target: `${process.env.ORDER_SERVICE_URL || 'http://localhost'}:${process.env.ORDER_SERVICE_PORT || '3004'}`,
      changeOrigin: true,
    }),
  );
};
