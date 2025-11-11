import { EventBus, getEventBus } from '@tp-microservices/shared';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const eventBus = getEventBus();

export interface RegisterData {
  email: string;
  password: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    role: string;
  };
  token: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    const { email, password, role = 'user' } = data;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    await eventBus.publish(
      'user.created',
      {
        userId: user.id,
        email: user.email,
        name: user.email,
      },
      'auth-service',
    );

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, String(process.env.JWT_SECRET) || 'secret', {
      expiresIn: '24h',
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, String(process.env.JWT_SECRET) || 'secret', {
      expiresIn: '24h',
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async verify(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
