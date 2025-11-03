import { OrderRepository } from '../repository/order.repository';
import { Order } from '../models/order.model';

export class OrderService {
  private orderRepository: OrderRepository;

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
      productId: number;
      quantity: number;
      price: number;
    }>;
  }): Promise<Order> {
    const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const data = { ...orderData, total, status: 'pending' as const };
    const newOrder = await this.orderRepository.create(data);
    return newOrder;
  }

  async updateOrder(
    id: number,
    orderData: {
      status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    },
  ): Promise<Order> {
    const updatedOrder = await this.orderRepository.updateById(id, orderData);
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
