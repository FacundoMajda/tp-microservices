export interface OrderAttributes {
  id: number;
  userId: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OrderCreateAttributes = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
