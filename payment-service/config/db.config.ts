import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import 'dotenv/config';

// Payment Service uses PostgreSQL for ACID compliance (financial transactions)
export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME || 'payment_db',
  user: process.env.DB_USER || 'payment_user',
  password: process.env.DB_PASSWORD || 'payment_pass123',
  host: process.env.DB_HOST || 'payment-db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Payment Service connected to dedicated PostgreSQL database');

    await sequelize.sync({ force: JSON.parse(process.env.FORCE_SYNC || 'false') });
    console.log('✅ Payment Service database synchronized');
  } catch (error) {
    console.error('❌ Payment Service connection to DB failed!', error);
    throw error;
  }
};
