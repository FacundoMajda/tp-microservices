import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import 'dotenv/config';

// Auth Service now has its own dedicated MySQL database
export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME || 'auth_db',
  user: process.env.DB_USER || 'auth_user',
  password: process.env.DB_PASSWORD || 'auth_pass123',
  host: process.env.DB_HOST || 'auth-db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Auth Service connected to dedicated MySQL database');

    await sequelize.sync({ force: JSON.parse(process.env.FORCE_SYNC || 'false') });
    console.log('✅ Auth Service database synchronized');
  } catch (error) {
    console.error('❌ Auth Service connection to DB failed!', error);
    throw error;
  }
};
