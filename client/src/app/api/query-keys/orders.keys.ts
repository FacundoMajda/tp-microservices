export const ORDERS_QUERY_KEYS = {
  all: ["orders"] as const,
  lists: () => [...ORDERS_QUERY_KEYS.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...ORDERS_QUERY_KEYS.lists(), params] as const,
  details: () => [...ORDERS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string | number) =>
    [...ORDERS_QUERY_KEYS.details(), id] as const,
} as const;
