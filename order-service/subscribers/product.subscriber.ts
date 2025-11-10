import { EventBus } from '@tp-microservices/shared';
import { ProductCreatedEvent, ProductUpdatedEvent, ProductDeletedEvent } from '@tp-microservices/shared';
import { ProductCache } from '../models/product-cache.model';
import { Logger } from '../utils/logger';

/**
 * Product Event Subscriber
 * Escucha eventos de producto y mantiene actualizado el caché local
 */
export class ProductSubscriber {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Inicializa todos los subscriptores de eventos de producto
   */
  async initialize(): Promise<void> {
    await this.subscribeToProductCreated();
    await this.subscribeToProductUpdated();
    await this.subscribeToProductDeleted();
    Logger.info('Product event subscribers initialized');
  }

  /**
   * Maneja evento product.created
   * Crea una nueva entrada en el caché de productos
   */
  private async subscribeToProductCreated(): Promise<void> {
    await this.eventBus.subscribe<ProductCreatedEvent>('product.created', async (event) => {
      try {
        Logger.info(`Received product.created event for product: ${event.data.productId}`);

        await ProductCache.create({
          id: event.data.productId,
          name: event.data.name,
          price: event.data.price,
          stock: event.data.stock,
        });

        Logger.info(`Product cache created for: ${event.data.productId}`);
      } catch (error) {
        Logger.error('Error handling product.created event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento product.updated
   * Actualiza la entrada existente en el caché
   */
  private async subscribeToProductUpdated(): Promise<void> {
    await this.eventBus.subscribe<ProductUpdatedEvent>('product.updated', async (event) => {
      try {
        Logger.info(`Received product.updated event for product: ${event.data.productId}`);

        const product = await ProductCache.findByPk(event.data.productId);

        if (product) {
          await product.update({
            name: event.data.name,
            price: event.data.price,
            stock: event.data.stock,
          });
          Logger.info(`Product cache updated for: ${event.data.productId}`);
        } else {
          Logger.warn(`Product ${event.data.productId} not found in cache, creating...`);
          await ProductCache.create({
            id: event.data.productId,
            name: event.data.name,
            price: event.data.price,
            stock: event.data.stock,
          });
        }
      } catch (error) {
        Logger.error('Error handling product.updated event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento product.deleted
   * Elimina la entrada del caché
   */
  private async subscribeToProductDeleted(): Promise<void> {
    await this.eventBus.subscribe<ProductDeletedEvent>('product.deleted', async (event) => {
      try {
        Logger.info(`Received product.deleted event for product: ${event.data.productId}`);

        const deleted = await ProductCache.destroy({
          where: { id: event.data.productId },
        });

        if (deleted) {
          Logger.info(`Product cache deleted for: ${event.data.productId}`);
        } else {
          Logger.warn(`Product ${event.data.productId} not found in cache`);
        }
      } catch (error) {
        Logger.error('Error handling product.deleted event:', error as Error);
      }
    });
  }
}
