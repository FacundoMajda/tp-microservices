import { API_SERVICES } from "../types";
import type { Product } from "../../modules/ecommerce/products/repository";
import { clientAPI } from "../config";

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
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    }>({
      method: "GET",
      service: API_SERVICES.PRODUCTS,
      params,
    });
    return response.data;
  }
  // GET /products/:id
  static async getProduct(id: string | number): Promise<Product> {
    const response = await clientAPI.requestBuilder<Product>({
      method: "GET",
      service: API_SERVICES.PRODUCTS,
      id,
    });
    return response.data;
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
    return response.data;
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
    return response.data;
  }

  // POST /products/add
  static async addProduct(product: Omit<Product, "id">): Promise<Product> {
    const response = await clientAPI.requestBuilder<Product>({
      method: "POST",
      service: API_SERVICES.PRODUCTS,
      body: product as Product,
    });
    return response.data;
  }

  // PUT /products/:id
  static async updateProduct(
    id: string | number,
    product: Partial<Product>
  ): Promise<Product> {
    const response = await clientAPI.requestBuilder<Product>({
      method: "PUT",
      service: API_SERVICES.PRODUCTS,
      id,
      body: product as Product,
    });
    return response.data;
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
