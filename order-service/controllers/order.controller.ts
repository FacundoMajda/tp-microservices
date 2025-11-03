import { Request, Response } from 'express';
import { OrderRepository } from '../repository/order.repository';
import { OrderService } from '../services/order.service';

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);

export class OrderController {
  static async getAllOrders(_req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.json({ success: true, data: orders });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pedidos' });
      return;
    }
  }

  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(parseInt(id));
      if (!order) {
        res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        return;
      }
      res.json({ success: true, data: order });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pedido' });
      return;
    }
  }

  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      const userId = (req.user as any).id;
      const newOrder = await orderService.createOrder({
        userId,
        items,
      });
      res.status(201).json({ success: true, data: newOrder });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear pedido' });
      return;
    }
  }

  static async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await orderService.updateOrder(Number(id), {
        status,
      });
      res.json({ success: true, data: updatedOrder });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar pedido' });
      return;
    }
  }

  static async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(parseInt(id));
      res.json({ success: true, message: 'Pedido eliminado exitosamente' });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar pedido' });
      return;
    }
  }

  static async getOrdersByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any).id;
      const orders = await orderService.getOrdersByUserId(userId);
      res.json({ success: true, data: orders });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pedidos del usuario',
      });
      return;
    }
  }

  static async getOrdersByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const orders = await orderService.getOrdersByStatus(status);
      res.json({ success: true, data: orders });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pedidos por estado',
      });
      return;
    }
  }
}
