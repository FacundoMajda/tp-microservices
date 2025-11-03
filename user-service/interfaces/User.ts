import type { PartialBy } from '@sequelize/utils';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string; // 'admin' or 'user'
  primaryPhone: string | null;
  preferences: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserCreateAttributes = PartialBy<
  UserAttributes,
  'id' | 'primaryPhone' | 'preferences' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
