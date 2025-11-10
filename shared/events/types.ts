// ============================================
// Event Types for Microservices Communication
// ============================================

// Base Event Interface
export interface BaseEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  service: string;
}

// ============================================
// USER EVENTS
// ============================================
export interface UserCreatedEvent extends BaseEvent {
  eventType: "user.created";
  data: {
    userId: number;
    email: string;
    name: string;
  };
}

export interface UserUpdatedEvent extends BaseEvent {
  eventType: "user.updated";
  data: {
    userId: number;
    email?: string;
    name?: string;
  };
}

export interface UserDeletedEvent extends BaseEvent {
  eventType: "user.deleted";
  data: {
    userId: number;
  };
}

// ============================================
// PRODUCT EVENTS
// ============================================
export interface ProductCreatedEvent extends BaseEvent {
  eventType: "product.created";
  data: {
    productId: string; // MongoDB uses string IDs
    name: string;
    price: number;
    stock: number;
  };
}

export interface ProductUpdatedEvent extends BaseEvent {
  eventType: "product.updated";
  data: {
    productId: string; // MongoDB uses string IDs
    name?: string;
    price?: number;
    stock?: number;
  };
}

export interface ProductDeletedEvent extends BaseEvent {
  eventType: "product.deleted";
  data: {
    productId: string; // MongoDB uses string IDs
  };
}

export interface StockReservedEvent extends BaseEvent {
  eventType: "product.stock.reserved";
  data: {
    productId: string; // MongoDB uses string IDs
    quantity: number;
    orderId: number;
  };
}

export interface StockReleasedEvent extends BaseEvent {
  eventType: "product.stock.released";
  data: {
    productId: string; // MongoDB uses string IDs
    quantity: number;
    orderId: number;
  };
}

// ============================================
// ORDER EVENTS
// ============================================
export interface OrderCreatedEvent extends BaseEvent {
  eventType: "order.created";
  data: {
    orderId: number;
    userId: number;
    total: number;
    items: Array<{
      productId: string; // MongoDB uses string IDs
      quantity: number;
      price: number;
    }>;
  };
}

export interface OrderStatusChangedEvent extends BaseEvent {
  eventType: "order.status.changed";
  data: {
    orderId: number;
    oldStatus: string;
    newStatus: string;
  };
}

export interface OrderCancelledEvent extends BaseEvent {
  eventType: "order.cancelled";
  data: {
    orderId: number;
    reason: string;
  };
}

// ============================================
// PAYMENT EVENTS
// ============================================
export interface PaymentProcessedEvent extends BaseEvent {
  eventType: "payment.processed";
  data: {
    paymentId: number;
    orderId: number;
    amount: number;
    status: "success" | "failed";
  };
}

export interface PaymentFailedEvent extends BaseEvent {
  eventType: "payment.failed";
  data: {
    paymentId: number;
    orderId: number;
    reason: string;
  };
}

export interface PaymentRefundedEvent extends BaseEvent {
  eventType: "payment.refunded";
  data: {
    paymentId: number;
    orderId: number;
    amount: number;
  };
}

// ============================================
// Union Type for all events
// ============================================
export type DomainEvent =
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserDeletedEvent
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | ProductDeletedEvent
  | StockReservedEvent
  | StockReleasedEvent
  | OrderCreatedEvent
  | OrderStatusChangedEvent
  | OrderCancelledEvent
  | PaymentProcessedEvent
  | PaymentFailedEvent
  | PaymentRefundedEvent;

// ============================================
// Event Type Guards
// ============================================
export const isUserEvent = (
  event: DomainEvent
): event is UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent => {
  return event.eventType.startsWith("user.");
};

export const isProductEvent = (
  event: DomainEvent
): event is
  | ProductCreatedEvent
  | ProductUpdatedEvent
  | ProductDeletedEvent
  | StockReservedEvent
  | StockReleasedEvent => {
  return event.eventType.startsWith("product.");
};

export const isOrderEvent = (
  event: DomainEvent
): event is
  | OrderCreatedEvent
  | OrderStatusChangedEvent
  | OrderCancelledEvent => {
  return event.eventType.startsWith("order.");
};

export const isPaymentEvent = (
  event: DomainEvent
): event is
  | PaymentProcessedEvent
  | PaymentFailedEvent
  | PaymentRefundedEvent => {
  return event.eventType.startsWith("payment.");
};
