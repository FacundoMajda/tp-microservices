import { CreationOptional, DataTypes, Model } from '@sequelize/core';
import { PaymentAttributes, PaymentCreateAttributes } from '../interfaces/Payment';

export class Payment extends Model<PaymentAttributes, PaymentCreateAttributes> {
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare amount: number;
  declare status: 'pending' | 'completed' | 'failed' | 'refunded';
  declare method: 'card' | 'paypal' | 'bank_transfer';
  declare transactionId?: string;
  declare deletedAt: Date | null;

  static initModel(sequelize: any) {
    Payment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
          allowNull: false,
          defaultValue: 'pending',
        },
        method: {
          type: DataTypes.ENUM('card', 'paypal', 'bank_transfer'),
          allowNull: false,
        },
        transactionId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Payment',
        paranoid: true,
      },
    );
  }
}
