import { Request, Response, Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { adminMiddleware, authMiddleware } from '../middlewares';

const router = Router();

// GET /products - Obtener todos los productos
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  await ProductController.getAllProducts(req, res);
});

// GET /products/:id - Obtener producto por ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  await ProductController.getProductById(req, res);
});

// GET /products/category/:category - Obtener productos por categoría
router.get('/category/:category', authMiddleware, async (req: Request, res: Response) => {
  await ProductController.getProductsByCategory(req, res);
});

// POST /products - Crear nuevo producto (requiere admin)
router.post('/', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await ProductController.createProduct(req, res);
});

// PUT /products/:id - Actualizar producto (requiere admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await ProductController.updateProduct(req, res);
});

// DELETE /products/:id - Soft delete producto (requiere admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await ProductController.deleteProduct(req, res);
});

export default router;
