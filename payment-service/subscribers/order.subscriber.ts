import { EventBus } from '@tp-microservices/shared';
import { OrderCreatedEvent } from '@tp-microservices/shared';
import { PaymentService } from '../services/payment.service';
import { Logger } from '../utils/logger';

/**
 * Order Event Subscriber for Payment Service
 * Escucha eventos de pedidos para procesar pagos automáticamente
 */
export class OrderSubscriber {
  private eventBus: EventBus;
  private paymentService: PaymentService;

  constructor(eventBus: EventBus, paymentService: PaymentService) {
    this.eventBus = eventBus;
    this.paymentService = paymentService;
  }

  /**
   * Inicializa todos los subscriptores de eventos de pedido
   */
  async initialize(): Promise<void> {
    await this.subscribeToOrderCreated();
    Logger.info('Order event subscribers initialized in payment-service');
  }

  /**
   * Maneja evento order.created
   * Crea automáticamente un pago pendiente para el pedido
   */
  private async subscribeToOrderCreated(): Promise<void> {
    await this.eventBus.subscribe<OrderCreatedEvent>('order.created', async (event) => {
      try {
        Logger.info(`Received order.created event for order: ${event.data.orderId}`);

        // Crear pago automático para el pedido
        const payment = await this.paymentService.createPayment({
          orderId: event.data.orderId,
          amount: event.data.total,
          method: 'card', // Default payment method
        });

        Logger.info(`Automatic payment created for order ${event.data.orderId}: payment ${payment.id}`);

        // Intentar procesar el pago automáticamente
        try {
          await this.paymentService.processPayment(payment.id);
          Logger.info(`Payment ${payment.id} processed successfully`);
        } catch (error) {
          Logger.error(`Failed to process payment ${payment.id}:`, error as Error);
        }
      } catch (error) {
        Logger.error('Error handling order.created event:', error as Error);
      }
    });
  }
}
