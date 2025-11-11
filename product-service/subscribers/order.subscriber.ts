import { EventBus } from '@tp-microservices/shared';
import { OrderCreatedEvent, OrderStatusChangedEvent, StockReservedEvent, StockReleasedEvent } from '@tp-microservices/shared';
import { ProductService } from '../services/product.service';
import { Logger } from '../utils/logger';

/**
 * Order Event Subscriber for Product Service
 * Escucha eventos de pedidos para gestionar stock de productos
 */
export class OrderSubscriber {
  private eventBus: EventBus;
  private productService: ProductService;

  constructor(eventBus: EventBus, productService: ProductService) {
    this.eventBus = eventBus;
    this.productService = productService;
  }

  /**
   * Inicializa todos los subscriptores de eventos de pedido
   */
  async initialize(): Promise<void> {
    await this.subscribeToOrderCreated();
    await this.subscribeToOrderStatusChanged();
    await this.subscribeToStockReleased();
    Logger.info('Order event subscribers initialized in product-service');
  }

  /**
   * Maneja evento order.created
   * Reduce el stock de productos cuando se crea un pedido
   */
  private async subscribeToOrderCreated(): Promise<void> {
    await this.eventBus.subscribe<OrderCreatedEvent>('order.created', async (event) => {
      try {
        Logger.info(`Received order.created event for order: ${event.data.orderId}`);

        // Reducir stock de cada producto en el pedido
        for (const item of event.data.items) {
          const product = await this.productService.getProductById(item.productId);
          if (!product) {
            Logger.error(`Product ${item.productId} not found for order ${event.data.orderId}`);
            continue;
          }

          if (product.stock < item.quantity) {
            Logger.error(`Insufficient stock for product ${item.productId}: requested ${item.quantity}, available ${product.stock}`);
            // Aquí podríamos publicar un evento de stock insuficiente
            continue;
          }

          // Reducir stock
          await this.productService.updateProduct(item.productId, {
            stock: product.stock - item.quantity,
          });

          // Publish stock.reserved event
          try {
            await this.eventBus.publish(
              'product.stock.reserved',
              {
                productId: item.productId,
                quantity: item.quantity,
                orderId: event.data.orderId,
              },
              'product-service',
            );
          } catch (error) {
            Logger.error('Failed to publish stock.reserved event:', error as Error);
          }

          Logger.info(`Stock reduced for product ${item.productId}: -${item.quantity}`);
        }

        Logger.info(`Stock management completed for order: ${event.data.orderId}`);
      } catch (error) {
        Logger.error('Error handling order.created event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento order.status.changed
   * Restaura stock si el pedido es cancelado
   */
  private async subscribeToOrderStatusChanged(): Promise<void> {
    await this.eventBus.subscribe<OrderStatusChangedEvent>('order.status.changed', async (event) => {
      try {
        Logger.info(`Received order.status.changed event for order: ${event.data.orderId}`);

        // Si el pedido es cancelado, restaurar stock
        if (event.data.newStatus === 'cancelled') {
          // Nota: Necesitaríamos acceder a los items del pedido
          // Por simplicidad, asumimos que se maneja en order-service
          Logger.info(`Order ${event.data.orderId} cancelled - stock restoration handled by order-service`);
        }
      } catch (error) {
        Logger.error('Error handling order.status.changed event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento product.stock.released
   * Aumenta el stock cuando se libera
   */
  private async subscribeToStockReleased(): Promise<void> {
    await this.eventBus.subscribe<StockReleasedEvent>('product.stock.released', async (event) => {
      try {
        Logger.info(`Received stock.released event for product: ${event.data.productId}`);

        const product = await this.productService.getProductById(event.data.productId);
        if (!product) {
          Logger.error(`Product ${event.data.productId} not found for stock release`);
          return;
        }

        // Aumentar stock
        await this.productService.updateProduct(event.data.productId, {
          stock: product.stock + event.data.quantity,
        });

        Logger.info(`Stock released for product ${event.data.productId}: +${event.data.quantity}`);
      } catch (error) {
        Logger.error('Error handling stock.released event:', error as Error);
      }
    });
  }
}
