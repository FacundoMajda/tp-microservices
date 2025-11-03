import { Request, Response, Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { adminMiddleware, authMiddleware } from '../middlewares';

const router = Router();

// GET /payments - Obtener todos los pagos (requiere admin)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.getAllPayments(req, res);
});

// GET /payments/:id - Obtener pago por ID (requiere admin)
router.get('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.getPaymentById(req, res);
});

// GET /payments/order/:orderId - Obtener pagos por orderId (requiere admin)
router.get('/order/:orderId', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.getPaymentsByOrderId(req, res);
});

// GET /payments/status/:status - Obtener pagos por estado (requiere admin)
router.get('/status/:status', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.getPaymentsByStatus(req, res);
});

// POST /payments - Crear nuevo pago
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await PaymentController.createPayment(req, res);
});

// PUT /payments/:id - Actualizar pago (requiere admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.updatePayment(req, res);
});

// DELETE /payments/:id - Soft delete pago (requiere admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.deletePayment(req, res);
});

// POST /payments/:id/process - Procesar pago (requiere admin)
router.post('/:id/process', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await PaymentController.processPayment(req, res);
});

export default router;
