import {
  debugProxyErrorsPlugin, // subscribe to proxy errors to prevent server from crashing
  loggerPlugin, // log proxy events to a logger (ie. console)
  errorResponsePlugin, // return 5xx response on proxy error
  proxyEventsPlugin, // implements the "on:" option
  createProxyMiddleware,
} from 'http-proxy-middleware';
import { Application } from 'express';

export const setupProxyMiddlewares = (app: Application): void => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
      ejectPlugins: true,
      plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
    }),
  );

  app.use(
    '/users',
    createProxyMiddleware({
      target: process.env.USER_SERVICE_URL || 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/users': '' },
      ejectPlugins: true,
      plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
    }),
  );

  app.use(
    '/products',
    createProxyMiddleware({
      target: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: { '^/products': '' },
      ejectPlugins: true,
      plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
    }),
  );

  app.use(
    '/orders',
    createProxyMiddleware({
      target: process.env.ORDER_SERVICE_URL || 'http://localhost:3004',
      changeOrigin: true,
      pathRewrite: { '^/orders': '' },
      ejectPlugins: true,
      plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
    }),
  );

  app.use(
    '/payments',
    createProxyMiddleware({
      target: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: { '^/payments': '' },
      ejectPlugins: true,
      plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
    }),
  );
};
