import { API_SERVICES } from "../types";
import { clientAPI } from "../config";
import type { Payment } from "@/app/modules/ecommerce/payment/repository";

type PaymentFilters = Record<string, string | number | boolean>;

export class PaymentsService {
  // GET /payments
  static async getPayments(params?: PaymentFilters): Promise<{
    payments: Payment[];
    total: number;
    skip: number;
    limit: number;
  }> {
    const response = await clientAPI.requestBuilder<{
      success?: boolean;
      data?: Payment[];
      payments?: Payment[];
      total?: number;
      skip?: number;
      limit?: number;
    }>({
      method: "GET",
      service: API_SERVICES.PAYMENTS,
      params,
    });

    let data = response.data;

    // Handle backend response format (success/data structure)
    if ("success" in data && "data" in data) {
      return {
        payments: data.data || [],
        total: data.data?.length || 0,
        skip: 0,
        limit: data.data?.length || 0,
      };
    }

    // Handle standard format
    return data as {
      payments: Payment[];
      total: number;
      skip: number;
      limit: number;
    };
  }

  // GET /payments/:id
  static async getPayment(id: string | number): Promise<Payment> {
    const response = await clientAPI.requestBuilder<
      | {
          success?: boolean;
          data?: Payment;
        }
      | Payment
    >({
      method: "GET",
      service: API_SERVICES.PAYMENTS,
      id,
    });

    let data = response.data;

    // Handle backend response format
    if ("success" in data && "data" in data) {
      return data.data as Payment;
    }

    return data as Payment;
  }

  // POST /payments
  static async addPayment(payment: Omit<Payment, "id">): Promise<Payment> {
    const response = await clientAPI.requestBuilder<Payment>({
      method: "POST",
      service: API_SERVICES.PAYMENTS,
      body: payment as Payment,
    });
    return response.data;
  }

  // PUT /payments/:id
  static async updatePayment(
    id: string | number,
    payment: Partial<Payment>
  ): Promise<Payment> {
    const response = await clientAPI.requestBuilder<Payment>({
      method: "PUT",
      service: API_SERVICES.PAYMENTS,
      id,
      body: payment as Payment,
    });
    return response.data;
  }

  // DELETE /payments/:id
  static async deletePayment(
    id: string | number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> {
    const response = await clientAPI.requestBuilder<{
      id: number;
      isDeleted: boolean;
      deletedOn: string;
    }>({
      method: "DELETE",
      service: API_SERVICES.PAYMENTS,
      id,
    });
    return response.data;
  }
}
