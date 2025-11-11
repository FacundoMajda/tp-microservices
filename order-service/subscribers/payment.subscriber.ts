import { EventBus } from '@tp-microservices/shared';
import { PaymentProcessedEvent, PaymentFailedEvent } from '@tp-microservices/shared';
import { OrderService } from '../services/order.service';
import { Logger } from '../utils/logger';

/**
 * Payment Event Subscriber for Order Service
 * Escucha eventos de pagos para actualizar status de pedidos
 */
export class PaymentSubscriber {
  private eventBus: EventBus;
  private orderService: OrderService;

  constructor(eventBus: EventBus, orderService: OrderService) {
    this.eventBus = eventBus;
    this.orderService = orderService;
  }

  /**
   * Inicializa todos los subscriptores de eventos de pago
   */
  async initialize(): Promise<void> {
    await this.subscribeToPaymentProcessed();
    await this.subscribeToPaymentFailed();
    Logger.info('Payment event subscribers initialized in order-service');
  }

  /**
   * Maneja evento payment.processed
   * Actualiza el pedido a confirmado cuando el pago es exitoso
   */
  private async subscribeToPaymentProcessed(): Promise<void> {
    await this.eventBus.subscribe<PaymentProcessedEvent>('payment.processed', async (event) => {
      try {
        Logger.info(`Received payment.processed event for payment: ${event.data.paymentId}`);

        // Buscar el pedido por orderId y actualizar a confirmado
        const orders = await this.orderService.getOrdersByStatus('pending');
        const order = orders.find((o) => o.id === event.data.orderId);

        if (order) {
          await this.orderService.updateOrder(order.id, { status: 'confirmed' });
          Logger.info(`Order ${order.id} confirmed after successful payment ${event.data.paymentId}`);
        } else {
          Logger.warn(`Order ${event.data.orderId} not found for payment ${event.data.paymentId}`);
        }
      } catch (error) {
        Logger.error('Error handling payment.processed event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento payment.failed
   * Actualiza el pedido a cancelado cuando el pago falla
   */
  private async subscribeToPaymentFailed(): Promise<void> {
    await this.eventBus.subscribe<PaymentFailedEvent>('payment.failed', async (event) => {
      try {
        Logger.info(`Received payment.failed event for payment: ${event.data.paymentId}`);

        // Buscar el pedido por orderId y actualizar a cancelado
        const orders = await this.orderService.getOrdersByStatus('pending');
        const order = orders.find((o) => o.id === event.data.orderId);

        if (order) {
          await this.orderService.updateOrder(order.id, { status: 'cancelled' });
          Logger.info(`Order ${order.id} cancelled after failed payment ${event.data.paymentId}`);
        } else {
          Logger.warn(`Order ${event.data.orderId} not found for failed payment ${event.data.paymentId}`);
        }
      } catch (error) {
        Logger.error('Error handling payment.failed event:', error as Error);
      }
    });
  }
}
