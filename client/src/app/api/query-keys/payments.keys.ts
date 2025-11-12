export const PAYMENTS_QUERY_KEYS = {
  all: ["payments"] as const,
  lists: () => [...PAYMENTS_QUERY_KEYS.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...PAYMENTS_QUERY_KEYS.lists(), params] as const,
  details: () => [...PAYMENTS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string | number) =>
    [...PAYMENTS_QUERY_KEYS.details(), id] as const,
} as const;
