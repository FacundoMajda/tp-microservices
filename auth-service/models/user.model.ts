import { CreationOptional, DataTypes, Model } from '@sequelize/core';
import { UserAttributes, UserCreateAttributes } from '../interfaces/User';

export class User extends Model<UserAttributes, UserCreateAttributes> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare role: string; // 'admin' or 'user'

  static initModel(sequelize: any) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
      },
      {
        sequelize,
        modelName: 'User',
        paranoid: true,
      },
    );
  }
}
