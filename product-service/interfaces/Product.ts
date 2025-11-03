import type { PartialBy } from '@sequelize/utils';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ProductCreateAttributes = PartialBy<ProductAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
