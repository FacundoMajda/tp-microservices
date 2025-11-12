import { ProductRepository } from '../repository/product.repository';
import { IProduct } from '../models/product.model';
import { getEventBus } from '@tp-microservices/shared';

export class ProductService {
  private productRepository: ProductRepository;
  private eventBus = getEventBus();

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.productRepository.findWithExclusions({}, []);
    return products;
  }

  async getProductById(id: string): Promise<IProduct | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }

  async createProduct(
    productData: {
      title: string;
      description: string;
      price: number;
      stock: number;
      category: string;
      brand?: string;
      thumbnail?: string;
    },
    user: any,
  ): Promise<IProduct> {
    const data = { ...productData, userId: user.id };
    const newProduct = await this.productRepository.create(data);

    // Publish product.created event
    try {
      await this.eventBus.publish(
        'product.created',
        {
          productId: (newProduct as any)._id.toString(),
          name: newProduct.title,
          price: newProduct.price,
          stock: newProduct.stock,
        },
        'product-service',
      );
    } catch (error) {
      console.error('Failed to publish product.created event:', error);
    }

    return newProduct;
  }

  async updateProduct(
    id: string,
    productData: {
      title?: string;
      description?: string;
      price?: number;
      stock?: number;
      category?: string;
      brand?: string;
      thumbnail?: string;
    },
  ): Promise<IProduct> {
    const updatedProduct = await this.productRepository.updateById(id, productData);

    // Publish product.updated event
    try {
      await this.eventBus.publish(
        'product.updated',
        {
          productId: (updatedProduct as any)._id.toString(),
          name: updatedProduct.title,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
        },
        'product-service',
      );
    } catch (error) {
      console.error('Failed to publish product.updated event:', error);
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.deleteById(id);

    // Publish product.deleted event (opcional)
    try {
      await this.eventBus.publish(
        'product.deleted',
        {
          productId: id,
        },
        'product-service',
      );
    } catch (error) {
      console.error('Failed to publish product.deleted event:', error);
    }
  }

  async getProductsByCategory(category: string): Promise<IProduct[]> {
    const products = await this.productRepository.findByCategory(category);
    return products;
  }
}
