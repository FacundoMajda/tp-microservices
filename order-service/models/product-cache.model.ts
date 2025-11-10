import { DataTypes, Model, Sequelize } from '@sequelize/core';

/**
 * ProductCache Model - Réplica local de datos de productos para consultas rápidas
 * Se mantiene sincronizado mediante eventos de RabbitMQ
 */
export class ProductCache extends Model {
  declare id: string; // ID del producto desde product-service (MongoDB ObjectId)
  declare name: string; // Nombre del producto
  declare price: number; // Precio del producto
  declare stock: number; // Stock disponible
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof ProductCache {
    ProductCache.init(
      {
        id: {
          type: DataTypes.STRING(24), // MongoDB ObjectId es de 24 caracteres hexadecimales
          primaryKey: true,
          allowNull: false,
          comment: 'ID del producto desde product-service (MongoDB ObjectId)',
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: 'Nombre del producto',
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          comment: 'Precio del producto',
          validate: {
            min: 0,
          },
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: 'Stock disponible del producto',
          validate: {
            min: 0,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'product_cache',
        modelName: 'ProductCache',
        timestamps: true,
        underscored: true,
        indexes: [
          {
            name: 'idx_product_cache_name',
            fields: ['name'],
          },
          {
            name: 'idx_product_cache_stock',
            fields: ['stock'],
          },
        ],
        comment: 'Caché local de datos de productos',
      },
    );

    return ProductCache;
  }
}
