import { OrderRepository } from '../repository/order.repository';
import { Order } from '../models/order.model';
import { getEventBus } from '@tp-microservices/shared';

export class OrderService {
  private orderRepository: OrderRepository;
  private eventBus = getEventBus();

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.findWithExclusions({}, []);
    return orders;
  }

  async getOrderById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    return order;
  }

  async createOrder(orderData: {
    userId: number;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
  }): Promise<Order> {
    const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const data = { ...orderData, total, status: 'pending' as const };
    const newOrder = await this.orderRepository.create(data);

    // Publish order.created event
    try {
      await this.eventBus.publish(
        'order.created',
        {
          orderId: newOrder.id,
          userId: newOrder.userId,
          total: newOrder.total,
          items: newOrder.items,
        },
        'order-service',
      );
    } catch (error) {
      console.error('Failed to publish order.created event:', error);
    }

    return newOrder;
  }

  async updateOrder(
    id: number,
    orderData: {
      status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    },
  ): Promise<Order> {
    const updatedOrder = await this.orderRepository.updateById(id, orderData);

    if (orderData.status) {
      try {
        await this.eventBus.publish(
          'order.status.changed',
          {
            orderId: updatedOrder.id,
            oldStatus: 'pending',
            newStatus: updatedOrder.status,
          },
          'order-service',
        );

        // If order is cancelled, release stock
        if (updatedOrder.status === 'cancelled') {
          for (const item of updatedOrder.items) {
            try {
              await this.eventBus.publish(
                'product.stock.released',
                {
                  productId: item.productId,
                  quantity: item.quantity,
                  orderId: updatedOrder.id,
                },
                'order-service',
              );
            } catch (error) {
              console.error('Failed to publish stock.released event:', error);
            }
          }
        }
      } catch (error) {
        console.error('Failed to publish order.status.changed event:', error);
      }
    }

    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.findByUserId(userId);
    return orders;
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    const orders = await this.orderRepository.findByStatus(status);
    return orders;
  }
}
