import { Product, IProduct } from '../models/product.model';
import { FilterQuery } from 'mongoose';

export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: string, data: object): Promise<T>;
  deleteById(id: string): Promise<void>;
}

export class ProductRepository implements IRepository<IProduct> {
  async find(filter: FilterQuery<IProduct> = {}): Promise<IProduct[]> {
    // Find products excluding soft-deleted ones
    const products = await Product.find({ ...filter, deletedAt: null });
    return products;
  }

  async findById(id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id, deletedAt: null });
    return product;
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const product = await Product.create(data);
    return product;
  }

  async updateById(id: string, data: Partial<IProduct>): Promise<IProduct> {
    const product = await Product.findOneAndUpdate({ _id: id, deletedAt: null }, data, { new: true, runValidators: true });
    if (!product) throw new Error('Product not found');
    return product;
  }

  async deleteById(id: string): Promise<void> {
    // Soft delete
    const product = await Product.findOne({ _id: id, deletedAt: null });
    if (!product) throw new Error('Product not found');
    product.deletedAt = new Date();
    await product.save();
  }

  async findWithExclusions(filter: FilterQuery<IProduct>, exclusions: string[]): Promise<IProduct[]> {
    const select = exclusions.map((field) => `-${field}`).join(' ');
    const products = await Product.find({ ...filter, deletedAt: null }).select(select);
    return products;
  }

  async findByCategory(category: string): Promise<IProduct[]> {
    const products = await Product.find({ category, deletedAt: null });
    return products;
  }
}
