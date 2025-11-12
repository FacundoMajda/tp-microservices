import { API_SERVICES } from "../types";
import type { Order } from "../../modules/ecommerce/orders/api/repository";
import { clientAPI } from "../config";

type OrderFilters = Record<string, string | number | boolean>;

export class OrdersService {
  // GET /orders
  static async getOrders(params?: OrderFilters): Promise<{
    orders: Order[];
    total: number;
    skip: number;
    limit: number;
  }> {
    const response = await clientAPI.requestBuilder<{
      orders: Order[];
      total: number;
      skip: number;
      limit: number;
    }>({
      method: "GET",
      service: API_SERVICES.ORDERS,
      params,
    });
    return response.data;
  }

  // GET /orders/:id
  static async getOrder(id: string | number): Promise<Order> {
    const response = await clientAPI.requestBuilder<Order>({
      method: "GET",
      service: API_SERVICES.ORDERS,
      id,
    });
    return response.data;
  }

  // POST /orders
  static async addOrder(order: Omit<Order, "id">): Promise<Order> {
    const response = await clientAPI.requestBuilder<Order>({
      method: "POST",
      service: API_SERVICES.ORDERS,
      body: order as Order,
    });
    return response.data;
  }

  // PUT /orders/:id
  static async updateOrder(
    id: string | number,
    order: Partial<Order>
  ): Promise<Order> {
    const response = await clientAPI.requestBuilder<Order>({
      method: "PUT",
      service: API_SERVICES.ORDERS,
      id,
      body: order as Order,
    });
    return response.data;
  }

  // DELETE /orders/:id
  static async deleteOrder(
    id: string | number
  ): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> {
    const response = await clientAPI.requestBuilder<{
      id: number;
      isDeleted: boolean;
      deletedOn: string;
    }>({
      method: "DELETE",
      service: API_SERVICES.ORDERS,
      id,
    });
    return response.data;
  }
}
