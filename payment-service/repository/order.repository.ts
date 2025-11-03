import { CreationAttributes, WhereOptions } from '@sequelize/core';
import { Order } from './../models/order.model';

export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: number, data: object): Promise<T>;
  deleteById(id: number): Promise<void>;
}

export class OrderRepository implements IRepository<Order> {
  async find(filter: {}): Promise<Order[]> {
    const orders = await Order.findAll({ where: filter });
    return orders;
  }

  async findById(id: number): Promise<Order | null> {
    const order = await Order.findByPk(id);
    return order;
  }

  async create(data: {}): Promise<Order> {
    const order = await Order.create(data as CreationAttributes<Order>);
    return order;
  }

  async updateById(id: number, data: {}): Promise<Order> {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    await order.update(data);
    return order;
  }

  async deleteById(id: number): Promise<void> {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    await order.destroy();
  }

  async findWithExclusions(filter: WhereOptions, exclusions: string[]): Promise<Order[]> {
    const orders = await Order.findAll({
      where: filter,
      attributes: { exclude: exclusions as any },
    });
    return orders;
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await Order.findAll({
      where: { userId },
    });
    return orders;
  }

  async findByStatus(status: string): Promise<Order[]> {
    const orders = await Order.findAll({
      where: { status },
    });
    return orders;
  }
}
