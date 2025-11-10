import mongoose from 'mongoose';
import 'dotenv/config';

// Product Service now uses MongoDB for flexible schema and catalog management
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://product_user:product_pass123@product-db:27017/product_db?authSource=admin';

export const initializeDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Product Service connected to dedicated MongoDB database');

    // Setup connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Product Service connection to MongoDB failed!', error);
    throw error;
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

// Export mongoose for use in models
export { mongoose };
