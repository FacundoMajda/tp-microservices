import type { PartialBy } from '@sequelize/utils';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string; // 'admin' or 'user'
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserCreateAttributes = PartialBy<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
