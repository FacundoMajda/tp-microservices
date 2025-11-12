export interface ProductAttributes {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  thumbnail?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type ProductCreateAttributes = Omit<ProductAttributes, 'createdAt' | 'updatedAt'>;
