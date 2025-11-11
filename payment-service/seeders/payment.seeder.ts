import { Payment } from '../models/payment.model';

export class PaymentSeeder {
  static async seed(): Promise<void> {
    try {
      // Check if payments already exist
      const existingPayments = await Payment.count();
      if (existingPayments > 0) {
        console.log('Payments already seeded, skipping...');
        return;
      }

      console.log('Seeding payments...');

      // Create sample payments (assuming orders with IDs 1, 2, 3 exist)
      const payments = [
        {
          orderId: 1, // Delivered order
          amount: 1299.98,
          status: 'completed' as const,
          method: 'card' as const,
          transactionId: 'txn_1234567890',
        },
        {
          orderId: 2, // Pending order
          amount: 199.99,
          status: 'pending' as const,
          method: 'paypal' as const,
        },
        {
          orderId: 3, // Confirmed order
          amount: 899.97,
          status: 'completed' as const,
          method: 'bank_transfer' as const,
          transactionId: 'txn_0987654321',
        },
      ];

      await Payment.bulkCreate(payments);
      console.log(`Successfully seeded ${payments.length} payments!`);
    } catch (error) {
      console.error('Error seeding payments:', error);
      throw error;
    }
  }
}
