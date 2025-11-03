import { Request, Response, Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { adminMiddleware, authMiddleware } from '../middlewares';

const router = Router();

// GET /orders - Obtener todos los pedidos (requiere admin)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await OrderController.getAllOrders(req, res);
});

// GET /orders/:id - Obtener pedido por ID (propietario o admin)
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  await OrderController.getOrderById(req, res);
});

// GET /orders/user/me - Obtener pedidos del usuario actual
router.get('/user/me', authMiddleware, async (req: Request, res: Response) => {
  await OrderController.getOrdersByUserId(req, res);
});

// GET /orders/status/:status - Obtener pedidos por estado (requiere admin)
router.get('/status/:status', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await OrderController.getOrdersByStatus(req, res);
});

// POST /orders - Crear nuevo pedido
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await OrderController.createOrder(req, res);
});

// PUT /orders/:id - Actualizar pedido (requiere admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await OrderController.updateOrder(req, res);
});

// DELETE /orders/:id - Soft delete pedido (requiere admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await OrderController.deleteOrder(req, res);
});

export default router;
