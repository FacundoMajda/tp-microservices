import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PAYMENTS_QUERY_KEYS } from "../../../api/query-keys";
import { PaymentsService } from "@/app/api/services/payments.service";

// Types based on server API
export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  method: "card" | "paypal" | "bank_transfer";
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type PaymentFilters = Record<string, string | number | boolean>;

export class PaymentsRepository {
  // Get all payments
  static usePayments = (params?: PaymentFilters) => {
    return useQuery({
      queryKey: PAYMENTS_QUERY_KEYS.list(params),
      queryFn: () => PaymentsService.getPayments(params),
    });
  };

  // Get payment by ID
  static usePayment = (id: string | number) => {
    return useQuery({
      queryKey: PAYMENTS_QUERY_KEYS.detail(id),
      queryFn: () => PaymentsService.getPayment(id),
      enabled: !!id,
    });
  };

  // Add payment mutation
  static useAddPayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (payment: Omit<Payment, "id">) =>
        PaymentsService.addPayment(payment),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: PAYMENTS_QUERY_KEYS.lists(),
        });
      },
    });
  };

  // Update payment mutation
  static useUpdatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        payment,
      }: {
        id: string | number;
        payment: Partial<Payment>;
      }) => PaymentsService.updatePayment(id, payment),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: PAYMENTS_QUERY_KEYS.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: PAYMENTS_QUERY_KEYS.detail(variables.id),
        });
      },
    });
  };

  // Delete payment mutation
  static useDeletePayment = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string | number) => PaymentsService.deletePayment(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: PAYMENTS_QUERY_KEYS.lists(),
        });
      },
    });
  };
}
