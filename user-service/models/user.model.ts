import { CreationOptional, DataTypes, Model } from '@sequelize/core';
import { UserAttributes, UserCreateAttributes } from '../interfaces/User';
import { capitalizeFirstLetter } from '../utils';

export class User extends Model<UserAttributes, UserCreateAttributes> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare role: string; // 'admin' or 'user'
  declare primaryPhone: string | null;
  declare preferences: Record<string, any> | null;
  declare deletedAt: Date | null;

  getFullName(): string {
    return [capitalizeFirstLetter(this.firstName), capitalizeFirstLetter(this.lastName)].join(' ');
  }

  static initModel(sequelize: any) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user',
        },
        primaryPhone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        preferences: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        paranoid: true,
      },
    );
  }
}
