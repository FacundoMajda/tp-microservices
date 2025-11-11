import * as amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";
import { DomainEvent } from "./types";

export class EventBus {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private readonly exchange = "microservices.events";
  private readonly rabbitmqUrl: string;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private isReconnecting = false;
  private connectionPromise: Promise<void> | null = null;

  constructor(rabbitmqUrl?: string) {
    this.rabbitmqUrl =
      rabbitmqUrl ||
      process.env.RABBITMQ_URL ||
      "amqp://admin:admin123@localhost:5672";
  }

  /**
   * Connect to RabbitMQ and setup exchange
   */
  async connect(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = this._connect();
    return this.connectionPromise;
  }

  private async _connect(): Promise<void> {
    try {
      this.connection = (await amqp.connect(
        this.rabbitmqUrl
      )) as unknown as amqp.Connection;
      this.channel = (await (
        this.connection as any
      ).createChannel()) as unknown as amqp.Channel;

      // Create exchange (topic for pattern-based routing)
      await this.channel!.assertExchange(this.exchange, "topic", {
        durable: true,
      });

      // Handle connection errors
      this.connection!.on("error", (err: Error) => {
        console.error("RabbitMQ connection error:", err);
        this.handleDisconnect();
      });

      this.connection!.on("close", () => {
        console.warn("RabbitMQ connection closed");
        this.handleDisconnect();
      });

      this.reconnectAttempts = 0;
      this.isReconnecting = false;
      console.log("✅ EventBus connected to RabbitMQ");
    } catch (error) {
      console.error("❌ Failed to connect to RabbitMQ:", error);
      this.handleDisconnect();
      throw error;
    }
  }

  /**
   * Wait for connection to be established
   */
  async waitForConnection(timeoutMs: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (!this.channel) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(
          `Timeout waiting for RabbitMQ connection (${timeoutMs}ms)`
        );
      }

      // Try to connect if not already connecting
      if (!this.connectionPromise) {
        try {
          await this.connect();
        } catch (error) {
          console.warn("Connection attempt failed, retrying...");
        }
      }

      // Wait a bit before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  /**
   * Handle disconnection
   */
  private handleDisconnect(): void {
    if (!this.isReconnecting) {
      this.isReconnecting = true;
      this.reconnect();
    }
  }

  /**
   * Reconnect logic with exponential backoff
   */
  private async reconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(
        "❌ Max reconnection attempts reached. Please check RabbitMQ server."
      );
      this.isReconnecting = false;
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    console.log(
      `Attempting to reconnect to RabbitMQ in ${delay}ms... (attempt ${this.reconnectAttempts})`
    );

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * Publish an event to the bus
   */
  async publish<T extends DomainEvent>(
    eventType: T["eventType"],
    data: T["data"],
    serviceName: string
  ): Promise<void> {
    if (!this.channel) {
      console.error("❌ EventBus not connected. Cannot publish event.");
      return;
    }

    const event: DomainEvent = {
      eventId: uuidv4(),
      eventType,
      timestamp: new Date(),
      service: serviceName,
      data,
    } as DomainEvent;

    try {
      const message = Buffer.from(JSON.stringify(event));
      const routingKey = eventType; // Use event type as routing key

      this.channel.publish(this.exchange, routingKey, message, {
        persistent: true,
        contentType: "application/json",
      });

      console.log(`📤 Event published: ${eventType}`, {
        eventId: event.eventId,
      });
    } catch (error) {
      console.error(`❌ Failed to publish event ${eventType}:`, error);
      throw error;
    }
  }

  /**
   * Subscribe to specific event types
   */
  async subscribe<T extends DomainEvent>(
    eventPattern: string,
    handler: (event: T) => Promise<void>,
    queueName?: string
  ): Promise<void> {
    // Wait for connection if not connected
    if (!this.channel) {
      console.log(
        `⏳ Waiting for EventBus connection to subscribe to ${eventPattern}...`
      );
      try {
        await this.waitForConnection();
      } catch (error) {
        console.error(
          `❌ Failed to establish connection for subscription to ${eventPattern}:`,
          error
        );
        return;
      }
    }

    try {
      // Create queue (if not provided, create an exclusive queue)
      const queue = queueName || "";
      const { queue: createdQueue } = await this.channel!.assertQueue(queue, {
        durable: true,
        exclusive: !queueName, // Exclusive if no queue name provided
      });

      // Bind queue to exchange with pattern
      await this.channel!.bindQueue(createdQueue, this.exchange, eventPattern);

      // Consume messages
      await this.channel!.consume(
        createdQueue,
        async (msg: amqp.ConsumeMessage | null) => {
          if (!msg) return;

          try {
            const event = JSON.parse(msg.content.toString()) as T;
            console.log(`📥 Event received: ${event.eventType}`, {
              eventId: event.eventId,
            });

            // Handle the event
            await handler(event);

            // Acknowledge the message
            if (this.channel) {
              this.channel.ack(msg);
            }
          } catch (error) {
            console.error("❌ Error processing event:", error);
            // Reject and requeue the message
            if (this.channel) {
              this.channel.nack(msg, false, true);
            }
          }
        }
      );

      console.log(`✅ Subscribed to events: ${eventPattern}`);
    } catch (error) {
      console.error(`❌ Failed to subscribe to ${eventPattern}:`, error);
      throw error;
    }
  }

  /**
   * Close connection
   */
  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await (this.connection as any).close();
      }
      console.log("✅ EventBus connection closed");
    } catch (error) {
      console.error("❌ Error closing EventBus connection:", error);
    } finally {
      this.connection = null;
      this.channel = null;
    }
  }
}

// Singleton instance
let eventBusInstance: EventBus | null = null;

export const getEventBus = (rabbitmqUrl?: string): EventBus => {
  if (!eventBusInstance) {
    eventBusInstance = new EventBus(rabbitmqUrl);
  }
  return eventBusInstance;
};

// Default export for convenience
export default EventBus;
