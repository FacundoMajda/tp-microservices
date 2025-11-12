import { API_SERVICES } from "../types";
import type { Product } from "../../modules/ecommerce/products/api/repository";
import { clientAPI } from "../config";
import { APIAdapter } from "../client/adapter";
import { DUMMY_JSON_API_URL } from "@/app/constants";

type ProductFilters = Record<string, string | number | boolean>;

export class ProductsService {
  // GET /products
  static async getProducts(params?: ProductFilters): Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }> {
    const response = await clientAPI.requestBuilder<{
      success?: boolean;
      data?: Product[];
      products?: Product[];
      total?: number;
      skip?: number;
      limit?: number;
    }>({
      method: "GET",
      service: API_SERVICES.PRODUCTS,
      params,
    });

    // Handle different response formats
    let data = response.data;

    // If response has success/data structure (from our backend)
    if ("success" in data && "data" in data) {
      // Adapt MongoDB products (_id to id)
      const adaptedProducts = APIAdapter.adaptMongoProductsToFrontend(
        data.data || []
      );
      return {
        products: adaptedProducts,
        total: adaptedProducts.length,
        skip: 0,
        limit: adaptedProducts.length,
      };
    }

    // If response has products array (from dummyjson)
    if ("products" in data) {
      if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
        data.products = APIAdapter.adaptDummyProductsToServer(
          data.products as any
        );
      }
      return data as {
        products: Product[];
        total: number;
        skip: number;
        limit: number;
      };
    }

    // Fallback
    return {
      products: [],
      total: 0,
      skip: 0,
      limit: 0,
    };
  }
  // GET /products/:id
  static async getProduct(id: string | number): Promise<Product> {
    const response = await clientAPI.requestBuilder<
      | {
          success?: boolean;
          data?: Product;
        }
      | Product
    >({
      method: "GET",
      service: API_SERVICES.PRODUCTS,
      id,
    });

    let data = response.data;

    // Handle backend response format
    if ("success" in data && "data" in data) {
      data = data.data as Product;
    }

    // Handle dummyjson format
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      data = APIAdapter.adaptDummyProductToServer(data as any);
    } else {
      // Adapt MongoDB product (_id to id)
      data = APIAdapter.adaptMongoProductToFrontend(data);
    }

    return data as Product;
  }

  // GET /products/categories
  static async getCategories(): Promise<
    { slug: string; name: string; url: string }[]
  > {
    const response = await clientAPI.http.get("/products/categories");
    return response.data;
  }

  // GET /products/category/:category
  static async getProductsByCategory(
    category: string,
    params?: ProductFilters
  ): Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }> {
    const response = await clientAPI.requestBuilder<{
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>({
      method: "GET",
      service: API_SERVICES.PRODUCTS,
      category,
      params,
    });
    const data = response.data;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      data.products = APIAdapter.adaptDummyProductsToServer(
        data.products as any
      );
    }
    return data;
  }

  // GET /products/search?q=:query
  static async searchProducts(
    query: string,
    params?: ProductFilters
  ): Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }> {
    const response = await clientAPI.http.get("/products/search", {
      params: { ...params, q: query },
    });
    const data = response.data;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      data.products = APIAdapter.adaptDummyProductsToServer(
        data.products as any
      );
    }
    return data;
  }

  // POST /products/add
  static async addProduct(product: Omit<Product, "id">): Promise<Product> {
    let body = product;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      body = APIAdapter.adaptServerProductToDummy(product) as any;
    }
    const response = await clientAPI.requestBuilder<Product>({
      method: "POST",
      service: API_SERVICES.PRODUCTS,
      body: body as Product,
    });
    let data = response.data;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      data = APIAdapter.adaptDummyProductToServer(data as any);
    }
    return data;
  }

  // PUT /products/:id
  static async updateProduct(
    id: string | number,
    product: Partial<Product>
  ): Promise<Product> {
    let body = product;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      body = APIAdapter.adaptServerProductToDummy(product) as any;
    }
    const response = await clientAPI.requestBuilder<Product>({
      method: "PUT",
      service: API_SERVICES.PRODUCTS,
      id,
      body: body as Product,
    });
    let data = response.data;
    if (clientAPI.baseUrl === DUMMY_JSON_API_URL) {
      data = APIAdapter.adaptDummyProductToServer(data as any);
    }
    return data;
  }

  // DELETE /products/:id
  static async deleteProduct(
    id: string | number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> {
    const response = await clientAPI.requestBuilder<{
      id: number;
      isDeleted: boolean;
      deletedOn: string;
    }>({
      method: "DELETE",
      service: API_SERVICES.PRODUCTS,
      id,
    });
    return response.data;
  }
}
