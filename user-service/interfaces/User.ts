import type { PartialBy } from '@sequelize/utils';

export enum UserAccountType {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: UserAccountType;
  primaryPhone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserCreateAttributes = PartialBy<UserAttributes, 'id' | 'primaryPhone' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
