import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user.model';
import { encryptSync } from '../utils/bcrypt';
import { getEventBus } from '@tp-microservices/shared';

export class UserService {
  private userRepository: UserRepository;
  private eventBus = getEventBus();

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

    // Note: user.created event is published by auth-service during registration
    // This service handles user management after registration

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

    // Publish user.updated event
    try {
      await this.eventBus.publish(
        'user.updated',
        {
          userId: updatedUser.id,
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          email: updatedUser.email,
        },
        'user-service',
      );
    } catch (error) {
      console.error('Failed to publish user.updated event:', error);
    }

    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteById(id);

    // Publish user.deleted event
    try {
      await this.eventBus.publish(
        'user.deleted',
        {
          userId: id,
        },
        'user-service',
      );
    } catch (error) {
      console.error('Failed to publish user.deleted event:', error);
    }
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
