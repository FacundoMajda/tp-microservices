export interface PaymentAttributes {
  id: number;
  orderId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'paypal' | 'bank_transfer';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type PaymentCreateAttributes = Omit<PaymentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
