// Adapter to transform data from external APIs (e.g., dummyjson) to server format

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface ServerProduct {
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
  thumbnail?: string;
  images?: string[];
  discountPercentage?: number;
  rating?: number;
  brand?: string;
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export class APIAdapter {
  // Adapt a single dummy product to server format
  static adaptDummyProductToServer(dummyProduct: DummyProduct): ServerProduct {
    return {
      id: dummyProduct.id,
      name: dummyProduct.title, // Map title to name
      description: dummyProduct.description,
      price: dummyProduct.price,
      stock: dummyProduct.stock,
      category: dummyProduct.category,
      userId: 0, // Default userId since dummyjson doesn't have it
      createdAt: new Date(), // Dummy date since not provided
      updatedAt: new Date(),
      deletedAt: null,
      thumbnail: dummyProduct.thumbnail,
      images: dummyProduct.images,
      discountPercentage: dummyProduct.discountPercentage,
      rating: dummyProduct.rating,
      brand: dummyProduct.brand,
      tags: dummyProduct.tags,
      sku: dummyProduct.sku,
      weight: dummyProduct.weight,
      dimensions: dummyProduct.dimensions,
      warrantyInformation: dummyProduct.warrantyInformation,
      shippingInformation: dummyProduct.shippingInformation,
      availabilityStatus: dummyProduct.availabilityStatus,
      reviews: dummyProduct.reviews,
      returnPolicy: dummyProduct.returnPolicy,
      minimumOrderQuantity: dummyProduct.minimumOrderQuantity,
      meta: dummyProduct.meta,
    };
  }

  // Adapt an array of dummy products to server format
  static adaptDummyProductsToServer(
    dummyProducts: DummyProduct[]
  ): ServerProduct[] {
    return dummyProducts.map(this.adaptDummyProductToServer);
  }

  // Adapt MongoDB product (_id) to frontend format (id)
  static adaptMongoProductToFrontend(mongoProduct: any): any {
    if (!mongoProduct) return mongoProduct;

    const { _id, ...rest } = mongoProduct;
    return {
      ...rest,
      id: _id?.toString() || _id, // Convert ObjectId to string
      _id, // Keep _id for compatibility
    };
  }

  // Adapt array of MongoDB products
  static adaptMongoProductsToFrontend(mongoProducts: any[]): any[] {
    if (!Array.isArray(mongoProducts)) return mongoProducts;
    return mongoProducts.map(this.adaptMongoProductToFrontend);
  }

  // Adapt server product to dummy format (if needed for POST/PUT)
  static adaptServerProductToDummy(
    serverProduct: Partial<ServerProduct>
  ): Partial<DummyProduct> {
    return {
      id: serverProduct.id,
      title: serverProduct.name, // Map name to title
      description: serverProduct.description,
      price: serverProduct.price,
      stock: serverProduct.stock,
      category: serverProduct.category,
      thumbnail: serverProduct.thumbnail,
      images: serverProduct.images,
      discountPercentage: serverProduct.discountPercentage,
      rating: serverProduct.rating,
      brand: serverProduct.brand,
      tags: serverProduct.tags,
      sku: serverProduct.sku,
      weight: serverProduct.weight,
      dimensions: serverProduct.dimensions,
      warrantyInformation: serverProduct.warrantyInformation,
      shippingInformation: serverProduct.shippingInformation,
      availabilityStatus: serverProduct.availabilityStatus,
      reviews: serverProduct.reviews,
      returnPolicy: serverProduct.returnPolicy,
      minimumOrderQuantity: serverProduct.minimumOrderQuantity,
      meta: serverProduct.meta,
      // Other fields can be omitted or defaulted
    };
  }
}
