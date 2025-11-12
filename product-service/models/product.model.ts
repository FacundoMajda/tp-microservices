import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  thumbnail?: string;
  userId: number;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
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
    brand: {
      type: String,
      required: false,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: false,
      trim: true,
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
    timestamps: true,
    collection: 'products',
  },
);

productSchema.virtual('isDeleted').get(function (this: IProduct) {
  return this.deletedAt !== null;
});

productSchema.methods.softDelete = function (this: IProduct) {
  this.deletedAt = new Date();
  return this.save();
};

productSchema.methods.restore = function (this: IProduct) {
  this.deletedAt = null;
  return this.save();
};

export const Product = model<IProduct>('Product', productSchema);
