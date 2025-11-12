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
  _id?: string;
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
  images?: string[];
  discountPercentage?: number;
  rating?: number;
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
      title: dummyProduct.title, // Keep title as title
      description: dummyProduct.description,
      price: dummyProduct.price,
      stock: dummyProduct.stock,
      category: dummyProduct.category,
      brand: dummyProduct.brand,
      thumbnail: dummyProduct.thumbnail,
      userId: 0, // Default userId since dummyjson doesn't have it
      createdAt: new Date(), // Dummy date since not provided
      updatedAt: new Date(),
      deletedAt: null,
      images: dummyProduct.images,
      discountPercentage: dummyProduct.discountPercentage,
      rating: dummyProduct.rating,
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
      id: 0, // Dummy ID
      title: serverProduct.title || "", // Keep title as title
      description: serverProduct.description || "",
      price: serverProduct.price || 0,
      stock: serverProduct.stock || 0,
      category: serverProduct.category || "",
      brand: serverProduct.brand || "",
      thumbnail: serverProduct.thumbnail || "",
      images: serverProduct.images || [],
      discountPercentage: serverProduct.discountPercentage || 0,
      rating: serverProduct.rating || 0,
      tags: serverProduct.tags || [],
      sku: serverProduct.sku || "",
      weight: serverProduct.weight || 0,
      dimensions: serverProduct.dimensions,
      warrantyInformation: serverProduct.warrantyInformation || "",
      shippingInformation: serverProduct.shippingInformation || "",
      availabilityStatus: serverProduct.availabilityStatus || "",
      reviews: serverProduct.reviews || [],
      returnPolicy: serverProduct.returnPolicy || "",
      minimumOrderQuantity: serverProduct.minimumOrderQuantity || 1,
      meta: serverProduct.meta,
      // Other fields can be omitted or defaulted
    };
  }
}
