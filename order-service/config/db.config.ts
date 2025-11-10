import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import 'dotenv/config';

// Order Service now uses PostgreSQL for complex transactions
export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME || 'order_db',
  user: process.env.DB_USER || 'order_user',
  password: process.env.DB_PASSWORD || 'order_pass123',
  host: process.env.DB_HOST || 'order-db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Order Service connected to dedicated PostgreSQL database');

    await sequelize.sync({ force: JSON.parse(process.env.FORCE_SYNC || 'false') });
    console.log('✅ Order Service database synchronized');
  } catch (error) {
    console.error('❌ Order Service connection to DB failed!', error);
    throw error;
  }
};
