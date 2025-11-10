import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import 'dotenv/config';

// User Service now has its own dedicated MySQL database
export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME || 'user_db',
  user: process.env.DB_USER || 'user_user',
  password: process.env.DB_PASSWORD || 'user_pass123',
  host: process.env.DB_HOST || 'user-db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ User Service connected to dedicated MySQL database');

    await sequelize.sync({ force: JSON.parse(process.env.FORCE_SYNC || 'false') });
    console.log('✅ User Service database synchronized');
  } catch (error) {
    console.error('❌ User Service connection to DB failed!', error);
    throw error;
  }
};
