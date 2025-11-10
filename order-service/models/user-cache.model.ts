import { DataTypes, Model, Sequelize } from '@sequelize/core';

/**
 * UserCache Model - Réplica local de datos de usuarios para consultas rápidas
 * Se mantiene sincronizado mediante eventos de RabbitMQ
 */
export class UserCache extends Model {
  declare id: string; // UUID del usuario desde user-service
  declare name: string; // Nombre completo del usuario
  declare email: string; // Email del usuario
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize): typeof UserCache {
    UserCache.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          comment: 'ID del usuario desde user-service',
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: 'Nombre completo del usuario',
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          comment: 'Email del usuario',
          validate: {
            isEmail: true,
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
        tableName: 'user_cache',
        modelName: 'UserCache',
        timestamps: true,
        underscored: true,
        indexes: [
          {
            name: 'idx_user_cache_email',
            fields: ['email'],
          },
        ],
        comment: 'Caché local de datos de usuarios',
      },
    );

    return UserCache;
  }
}
