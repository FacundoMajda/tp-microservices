import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware, adminMiddleware, ownerOrAdminMiddleware } from '../middlewares';

const router = Router();

// GET /users - Obtener todos los usuarios (requiere admin)
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  await UserController.getAllUsers(req, res);
});

// GET /users/:id - Obtener usuario por ID (propietario o admin)
router.get('/:id', authMiddleware, ownerOrAdminMiddleware, async (req: Request, res: Response) => {
  await UserController.getUserById(req, res);
});

// POST /users - Crear nuevo usuario
router.post('/', async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

// PUT /users/:id - Actualizar usuario (propietario o admin)
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

// DELETE /users/:id - Soft delete usuario (propietario o admin)
router.delete('/:id', authMiddleware, ownerOrAdminMiddleware, async (req: Request, res: Response) => {
  await UserController.deleteUser(req, res);
});

// PUT /users/:id/preferences - Actualizar preferencias (propietario o admin)
router.put('/:id/preferences', authMiddleware, ownerOrAdminMiddleware, async (req: Request, res: Response) => {
  await UserController.updatePreferences(req, res);
});

export default router;
