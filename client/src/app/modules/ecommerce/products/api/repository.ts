import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEYS } from "../../../../api/query-keys";
import { ProductsService } from "../../../../api/services/products.service";

// Types based on server API (with future thumbnail support)
export interface Product {
  id?: number;
  _id?: string; // MongoDB ID
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
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

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type ProductFilters = Record<string, string | number | boolean>;

export class ProductsRepository {
  // Get all products
  static useProducts = (params?: ProductFilters) => {
    return useQuery({
      queryKey: PRODUCTS_QUERY_KEYS.list(params),
      queryFn: () => ProductsService.getProducts(params),
    });
  };

  // Get product by ID
  static useProduct = (id: string | number) => {
    return useQuery({
      queryKey: PRODUCTS_QUERY_KEYS.detail(id),
      queryFn: () => ProductsService.getProduct(id),
      enabled: !!id,
    });
  };

  // Get products by category
  static useProductsByCategory = (
    category: string,
    params?: ProductFilters
  ) => {
    return useQuery({
      queryKey: PRODUCTS_QUERY_KEYS.category(category),
      queryFn: () => ProductsService.getProductsByCategory(category, params),
      enabled: !!category,
    });
  };

  // Get all categories
  static useCategories = () => {
    return useQuery({
      queryKey: PRODUCTS_QUERY_KEYS.categories(),
      queryFn: () => ProductsService.getCategories(),
    });
  };

  // Search products
  static useSearchProducts = (query: string, params?: ProductFilters) => {
    return useQuery({
      queryKey: [...PRODUCTS_QUERY_KEYS.lists(), "search", query, params],
      queryFn: () => ProductsService.searchProducts(query, params),
      enabled: !!query,
    });
  };

  // Add product mutation
  static useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (product: Omit<Product, "id">) =>
        ProductsService.addProduct(product),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: PRODUCTS_QUERY_KEYS.lists(),
        });
      },
    });
  };

  // Update product mutation
  static useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        product,
      }: {
        id: string | number;
        product: Partial<Product>;
      }) => ProductsService.updateProduct(id, product),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: PRODUCTS_QUERY_KEYS.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: PRODUCTS_QUERY_KEYS.detail(variables.id),
        });
      },
    });
  };

  // Delete product mutation
  static useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string | number) => ProductsService.deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: PRODUCTS_QUERY_KEYS.lists(),
        });
      },
    });
  };
}
