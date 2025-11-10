import { Schema, model, Document } from 'mongoose';

// Product Interface for TypeScript
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: number;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema for MongoDB
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      index: true,
    },
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'products',
  },
);

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1, price: 1 }); // Category + price queries
productSchema.index({ deletedAt: 1 }); // Soft delete queries

// Virtual for checking if product is deleted
productSchema.virtual('isDeleted').get(function (this: IProduct) {
  return this.deletedAt !== null;
});

// Method to soft delete
productSchema.methods.softDelete = function (this: IProduct) {
  this.deletedAt = new Date();
  return this.save();
};

// Method to restore
productSchema.methods.restore = function (this: IProduct) {
  this.deletedAt = null;
  return this.save();
};

// Export the model
export const Product = model<IProduct>('Product', productSchema);
