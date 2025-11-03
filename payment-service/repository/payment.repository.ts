import { CreationAttributes, WhereOptions } from '@sequelize/core';
import { Payment } from './../models/payment.model';

export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: number, data: object): Promise<T>;
  deleteById(id: number): Promise<void>;
}

export class PaymentRepository implements IRepository<Payment> {
  async find(filter: {}): Promise<Payment[]> {
    const payments = await Payment.findAll({ where: filter });
    return payments;
  }

  async findById(id: number): Promise<Payment | null> {
    const payment = await Payment.findByPk(id);
    return payment;
  }

  async create(data: {}): Promise<Payment> {
    const payment = await Payment.create(data as CreationAttributes<Payment>);
    return payment;
  }

  async updateById(id: number, data: {}): Promise<Payment> {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    await payment.update(data);
    return payment;
  }

  async deleteById(id: number): Promise<void> {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    await payment.destroy();
  }

  async findWithExclusions(filter: WhereOptions, exclusions: string[]): Promise<Payment[]> {
    const payments = await Payment.findAll({
      where: filter,
      attributes: { exclude: exclusions as any },
    });
    return payments;
  }

  async findByOrderId(orderId: number): Promise<Payment[]> {
    const payments = await Payment.findAll({
      where: { orderId },
    });
    return payments;
  }

  async findByStatus(status: string): Promise<Payment[]> {
    const payments = await Payment.findAll({
      where: { status },
    });
    return payments;
  }
}
