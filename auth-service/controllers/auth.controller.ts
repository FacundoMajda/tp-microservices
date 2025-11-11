import { Request, Response } from 'express';
import { AuthService, RegisterData, LoginData } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const data: RegisterData = req.body;
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data: LoginData = req.body;
      const result = await AuthService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }
      const decoded = await AuthService.verify(token);
      res.status(200).json(decoded);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
