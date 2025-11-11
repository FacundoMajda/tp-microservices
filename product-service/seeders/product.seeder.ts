import { Product } from '../models/product.model';

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock?: number;
  category: string;
  brand?: string;
  thumbnail?: string;
}

interface DummyResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductSeeder {
  static async seed(): Promise<void> {
    try {
      // Check if products already exist
      const existingProducts = await Product.countDocuments();
      if (existingProducts > 0) {
        console.log('Products already seeded, skipping...');
        return;
      }

      console.log('Fetching products from dummyjson.com...');

      // Fetch products from dummyjson API
      const response = await fetch('https://dummyjson.com/products?limit=60');
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data: DummyResponse = await response.json();
      console.log(`Fetched ${data.products.length} products from API`);

      // Transform and seed products
      const productsToSeed = data.products.map((product: DummyProduct) => ({
        name: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock || Math.floor(Math.random() * 100) + 10, // Random stock if not provided
        category: product.category,
        userId: 1, // Default to admin user
      }));

      await Product.insertMany(productsToSeed);
      console.log(`Successfully seeded ${productsToSeed.length} products!`);
    } catch (error) {
      console.error('Error seeding products:', error);
      throw error;
    }
  }
}
