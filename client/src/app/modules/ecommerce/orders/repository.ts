import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDERS_QUERY_KEYS } from "../../../api/query-keys";
import { OrdersService } from "@/app/api/services/orders.service";

// Types based on server API
export interface Order {
  id: number;
  userId: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OrderFilters = Record<string, string | number | boolean>;

export class OrdersRepository {
  // Get all orders
  static useOrders = (params?: OrderFilters) => {
    return useQuery({
      queryKey: ORDERS_QUERY_KEYS.list(params),
      queryFn: () => OrdersService.getOrders(params),
    });
  };

  // Get order by ID
  static useOrder = (id: string | number) => {
    return useQuery({
      queryKey: ORDERS_QUERY_KEYS.detail(id),
      queryFn: () => OrdersService.getOrder(id),
      enabled: !!id,
    });
  };

  // Add order mutation
  static useAddOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (order: Omit<Order, "id">) => OrdersService.addOrder(order),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ORDERS_QUERY_KEYS.lists(),
        });
      },
    });
  };

  // Update order mutation
  static useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        order,
      }: {
        id: string | number;
        order: Partial<Order>;
      }) => OrdersService.updateOrder(id, order),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ORDERS_QUERY_KEYS.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: ORDERS_QUERY_KEYS.detail(variables.id),
        });
      },
    });
  };

  // Delete order mutation
  static useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string | number) => OrdersService.deleteOrder(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ORDERS_QUERY_KEYS.lists(),
        });
      },
    });
  };
}
