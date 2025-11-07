export const PRODUCTS_QUERY_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCTS_QUERY_KEYS.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...PRODUCTS_QUERY_KEYS.lists(), params] as const,
  details: () => [...PRODUCTS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string | number) =>
    [...PRODUCTS_QUERY_KEYS.details(), id] as const,
  categories: () => [...PRODUCTS_QUERY_KEYS.all, "categories"] as const,
  category: (category: string) =>
    [...PRODUCTS_QUERY_KEYS.all, "category", category] as const,
} as const;
