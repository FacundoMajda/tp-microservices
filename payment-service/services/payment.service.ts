import { PaymentRepository } from '../repository/payment.repository';
import { Payment } from '../models/payment.model';
import { getEventBus } from '@tp-microservices/shared';

export class PaymentService {
  private paymentRepository: PaymentRepository;
  private eventBus = getEventBus();

  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async getAllPayments(): Promise<Payment[]> {
    const payments = await this.paymentRepository.findWithExclusions({}, []);
    return payments;
  }

  async getPaymentById(id: number): Promise<Payment | null> {
    const payment = await this.paymentRepository.findById(id);
    return payment;
  }

  async createPayment(paymentData: {
    orderId: number;
    amount: number;
    method: 'card' | 'paypal' | 'bank_transfer';
    transactionId?: string;
  }): Promise<Payment> {
    const data = { ...paymentData, status: 'pending' as const };
    const newPayment = await this.paymentRepository.create(data);

    // Note: Payment processing is handled separately

    return newPayment;
  }

  async updatePayment(
    id: number,
    paymentData: {
      status?: 'pending' | 'completed' | 'failed' | 'refunded';
      transactionId?: string;
    },
  ): Promise<Payment> {
    const updatedPayment = await this.paymentRepository.updateById(id, paymentData);

    // Publish events based on status
    if (paymentData.status === 'failed') {
      try {
        await this.eventBus.publish(
          'payment.failed',
          {
            paymentId: updatedPayment.id,
            orderId: updatedPayment.orderId,
            reason: 'Payment failed',
          },
          'payment-service',
        );
      } catch (error) {
        console.error('Failed to publish payment.failed event:', error);
      }
    } else if (paymentData.status === 'completed') {
      try {
        await this.eventBus.publish(
          'payment.processed',
          {
            paymentId: updatedPayment.id,
            orderId: updatedPayment.orderId,
            amount: updatedPayment.amount,
            status: 'success',
          },
          'payment-service',
        );
      } catch (error) {
        console.error('Failed to publish payment.processed event:', error);
      }
    }

    return updatedPayment;
  }

  async deletePayment(id: number): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }

  async getPaymentsByOrderId(orderId: number): Promise<Payment[]> {
    const payments = await this.paymentRepository.findByOrderId(orderId);
    return payments;
  }

  async getPaymentsByStatus(status: string): Promise<Payment[]> {
    const payments = await this.paymentRepository.findByStatus(status);
    return payments;
  }

  async processPayment(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) throw new Error('Payment not found');
    if (payment.status !== 'pending') throw new Error('Payment already processed');
    const updatedPayment = await this.paymentRepository.updateById(id, { status: 'completed' });
    return updatedPayment;
  }
}
