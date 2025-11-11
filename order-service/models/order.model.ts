import { CreationOptional, DataTypes, Model } from '@sequelize/core';
import { OrderAttributes, OrderCreateAttributes } from '../interfaces/Order';

export class Order extends Model<OrderAttributes, OrderCreateAttributes> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  declare total: number;
  declare items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  declare deletedAt: Date | null;

  static initModel(sequelize: any) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
          allowNull: false,
          defaultValue: 'pending',
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Order',
        paranoid: true,
      },
    );
  }
}
