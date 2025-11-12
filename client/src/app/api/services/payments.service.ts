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
      payments: Payment[];
      total: number;
      skip: number;
      limit: number;
    }>({
      method: "GET",
      service: API_SERVICES.PAYMENTS,
      params,
    });
    return response.data;
  }

  // GET /payments/:id
  static async getPayment(id: string | number): Promise<Payment> {
    const response = await clientAPI.requestBuilder<Payment>({
      method: "GET",
      service: API_SERVICES.PAYMENTS,
      id,
    });
    return response.data;
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
