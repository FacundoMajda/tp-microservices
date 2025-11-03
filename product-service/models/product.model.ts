import { CreationOptional, DataTypes, Model } from '@sequelize/core';
import { ProductAttributes, ProductCreateAttributes } from '../interfaces/Product';

export class Product extends Model<ProductAttributes, ProductCreateAttributes> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare stock: number;
  declare category: string;
  declare userId: number;
  declare deletedAt: Date | null;

  static initModel(sequelize: any) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Product',
        paranoid: true,
      },
    );
  }
}
