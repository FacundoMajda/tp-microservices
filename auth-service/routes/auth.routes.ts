import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// POST /register
router.post('/register', AuthController.register);

// POST /login
router.post('/login', AuthController.login);

// POST /verify
router.post('/verify', AuthController.verify);

export default router;
