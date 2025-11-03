import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user.model';
import { encryptSync } from '../utils/bcrypt';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findWithExclusions({}, ['password']);
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findByIdWithExclusions(id, ['password']);
    return user;
  }

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    primaryPhone?: string;
    preferences?: Record<string, any>;
  }): Promise<User> {
    const hashedPassword = encryptSync(userData.password);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user',
    });
    return newUser;
  }

  async updateUser(
    id: number,
    userData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      role?: string;
      primaryPhone?: string;
      preferences?: Record<string, any>;
    },
  ): Promise<User> {
    const dataToUpdate = { ...userData };
    if (userData.password) {
      dataToUpdate.password = encryptSync(userData.password);
    }
    const updatedUser = await this.userRepository.updateById(id, dataToUpdate);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  async updatePreferences(id: number, preferences: Record<string, any>): Promise<User> {
    const updatedUser = await this.userRepository.updateById(id, { preferences });
    return updatedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
