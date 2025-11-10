import { EventBus } from '@tp-microservices/shared';
import { UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent } from '@tp-microservices/shared';
import { UserCache } from '../models/user-cache.model';
import { Logger } from '../utils/logger';

/**
 * User Event Subscriber
 * Escucha eventos de usuario y mantiene actualizado el caché local
 */
export class UserSubscriber {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Inicializa todos los subscriptores de eventos de usuario
   */
  async initialize(): Promise<void> {
    await this.subscribeToUserCreated();
    await this.subscribeToUserUpdated();
    await this.subscribeToUserDeleted();
    Logger.info('User event subscribers initialized');
  }

  /**
   * Maneja evento user.created
   * Crea una nueva entrada en el caché de usuarios
   */
  private async subscribeToUserCreated(): Promise<void> {
    await this.eventBus.subscribe<UserCreatedEvent>('user.created', async (event) => {
      try {
        Logger.info(`Received user.created event for user: ${event.data.userId}`);

        await UserCache.create({
          id: event.data.userId,
          name: event.data.name,
          email: event.data.email,
        });

        Logger.info(`User cache created for: ${event.data.userId}`);
      } catch (error) {
        Logger.error('Error handling user.created event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento user.updated
   * Actualiza la entrada existente en el caché
   */
  private async subscribeToUserUpdated(): Promise<void> {
    await this.eventBus.subscribe<UserUpdatedEvent>('user.updated', async (event) => {
      try {
        Logger.info(`Received user.updated event for user: ${event.data.userId}`);

        const user = await UserCache.findByPk(event.data.userId);

        if (user) {
          await user.update({
            name: event.data.name,
            email: event.data.email,
          });
          Logger.info(`User cache updated for: ${event.data.userId}`);
        } else {
          Logger.warn(`User ${event.data.userId} not found in cache, creating...`);
          await UserCache.create({
            id: event.data.userId,
            name: event.data.name,
            email: event.data.email,
          });
        }
      } catch (error) {
        Logger.error('Error handling user.updated event:', error as Error);
      }
    });
  }

  /**
   * Maneja evento user.deleted
   * Elimina la entrada del caché
   */
  private async subscribeToUserDeleted(): Promise<void> {
    await this.eventBus.subscribe<UserDeletedEvent>('user.deleted', async (event) => {
      try {
        Logger.info(`Received user.deleted event for user: ${event.data.userId}`);

        const deleted = await UserCache.destroy({
          where: { id: event.data.userId },
        });

        if (deleted) {
          Logger.info(`User cache deleted for: ${event.data.userId}`);
        } else {
          Logger.warn(`User ${event.data.userId} not found in cache`);
        }
      } catch (error) {
        Logger.error('Error handling user.deleted event:', error as Error);
      }
    });
  }
}
