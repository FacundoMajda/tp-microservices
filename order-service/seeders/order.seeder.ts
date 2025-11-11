import { Order } from '../models/order.model';

export class OrderSeeder {
  static async seed(): Promise<void> {
    try {
      // Check if orders already exist
      const existingOrders = await Order.count();
      if (existingOrders > 0) {
        console.log('Orders already seeded, skipping...');
        return;
      }

      console.log('Seeding orders...');

      // Create sample orders
      const orders = [
        {
          userId: 2, // Regular user
          status: 'delivered' as const,
          total: 1299.98,
          items: [
            {
              productId: '507f1f77bcf86cd799439011', // First product from dummyjson
              quantity: 2,
              price: 649.99,
            },
          ],
        },
        {
          userId: 2, // Regular user
          status: 'pending' as const,
          total: 199.99,
          items: [
            {
              productId: '507f1f77bcf86cd799439012', // Second product
              quantity: 1,
              price: 199.99,
            },
          ],
        },
        {
          userId: 1, // Admin user
          status: 'confirmed' as const,
          total: 899.97,
          items: [
            {
              productId: '507f1f77bcf86cd799439013', // Third product
              quantity: 3,
              price: 299.99,
            },
          ],
        },
      ];

      await Order.bulkCreate(orders);
      console.log(`Successfully seeded ${orders.length} orders!`);
    } catch (error) {
      console.error('Error seeding orders:', error);
      throw error;
    }
  }
}
