import { Request, Response } from 'express';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentService } from '../services/payment.service';

const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository);

export class PaymentController {
  static async getAllPayments(_req: Request, res: Response): Promise<void> {
    try {
      const payments = await paymentService.getAllPayments();
      res.json({ success: true, data: payments });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pagos' });
      return;
    }
  }

  static async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await paymentService.getPaymentById(parseInt(id));
      if (!payment) {
        res.status(404).json({ success: false, message: 'Pago no encontrado' });
        return;
      }
      res.json({ success: true, data: payment });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pago' });
      return;
    }
  }

  static async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const { orderId, amount, method, transactionId } = req.body;
      const newPayment = await paymentService.createPayment({
        orderId,
        amount,
        method,
        transactionId,
      });
      res.status(201).json({ success: true, data: newPayment });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear pago' });
      return;
    }
  }

  static async updatePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, transactionId } = req.body;
      const updatedPayment = await paymentService.updatePayment(Number(id), {
        status,
        transactionId,
      });
      res.json({ success: true, data: updatedPayment });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar pago' });
      return;
    }
  }

  static async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await paymentService.deletePayment(parseInt(id));
      res.json({ success: true, message: 'Pago eliminado exitosamente' });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar pago' });
      return;
    }
  }

  static async getPaymentsByOrderId(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const payments = await paymentService.getPaymentsByOrderId(parseInt(orderId));
      res.json({ success: true, data: payments });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pagos del pedido',
      });
      return;
    }
  }

  static async getPaymentsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const payments = await paymentService.getPaymentsByStatus(status);
      res.json({ success: true, data: payments });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener pagos por estado',
      });
      return;
    }
  }

  static async processPayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const processedPayment = await paymentService.processPayment(parseInt(id));
      res.json({ success: true, data: processedPayment });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al procesar pago' });
      return;
    }
  }
}
