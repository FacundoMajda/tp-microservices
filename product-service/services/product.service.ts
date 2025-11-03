import { ProductRepository } from '../repository/product.repository';
import { Product } from '../models/product.model';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findWithExclusions({}, []);
    return products;
  }

  async getProductById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }

  async createProduct(
    productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category: string;
    },
    user: any,
  ): Promise<Product> {
    const data = { ...productData, userId: user.id };
    const newProduct = await this.productRepository.create(data);
    return newProduct;
  }

  async updateProduct(
    id: number,
    productData: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      category?: string;
    },
  ): Promise<Product> {
    const updatedProduct = await this.productRepository.updateById(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productRepository.findByCategory(category);
    return products;
  }
}
