import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json({ success: true, data: users });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
      return;
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseInt(id));
      if (!user) {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        return;
      }
      res.json({ success: true, data: user });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuario' });
      return;
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password, role, primaryPhone, preferences } = req.body;
      const newUser = await userService.createUser({
        firstName,
        lastName,
        email,
        password,
        role,
        primaryPhone,
        preferences,
      });
      res.status(201).json({ success: true, data: { ...newUser.toJSON(), password: undefined } });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear usuario' });
      return;
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, role, primaryPhone, preferences } = req.body;
      const user = await userService.updateUser(parseInt(id), {
        firstName,
        lastName,
        email,
        role,
        primaryPhone,
        preferences,
      });
      res.json({ success: true, data: { ...user.toJSON(), password: undefined } });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar usuario' });
      return;
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteUser(parseInt(id));
      res.json({ success: true, message: 'Usuario eliminado exitosamente' });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
      return;
    }
  }

  static async updatePreferences(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { preferences } = req.body;
      const user = await userService.updatePreferences(parseInt(id), preferences);
      res.json({ success: true, data: { preferences: user.preferences } });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar preferencias' });
      return;
    }
  }
}
