import { CreationAttributes, WhereOptions } from '@sequelize/core';
import { Product } from './../models/product.model';

export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: number, data: object): Promise<T>;
  deleteById(id: number): Promise<void>;
}

export class ProductRepository implements IRepository<Product> {
  async find(filter: {}): Promise<Product[]> {
    const products = await Product.findAll({ where: filter });
    return products;
  }

  async findById(id: number): Promise<Product | null> {
    const product = await Product.findByPk(id);
    return product;
  }

  async create(data: {}): Promise<Product> {
    const product = await Product.create(data as CreationAttributes<Product>);
    return product;
  }

  async updateById(id: number, data: {}): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.update(data);
    return product;
  }

  async deleteById(id: number): Promise<void> {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.destroy();
  }

  async findWithExclusions(filter: WhereOptions, exclusions: string[]): Promise<Product[]> {
    const products = await Product.findAll({
      where: filter,
      attributes: { exclude: exclusions as any },
    });
    return products;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await Product.findAll({
      where: { category },
    });
    return products;
  }
}
