import { CreationAttributes, WhereOptions } from '@sequelize/core';
import { User } from './../models/user.model';

export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: number, data: object): Promise<T>;
  deleteById(id: number): Promise<void>;
}

export class UserRepository implements IRepository<User> {
  async find(filter: {}): Promise<User[]> {
    const users = await User.findAll({ where: filter });
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user;
  }

  async create(data: {}): Promise<User> {
    const user = await User.create(data as CreationAttributes<User>);
    return user;
  }

  async updateById(id: number, data: {}): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update(data);
    return user;
  }

  async deleteById(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findByIdWithExclusions(id: number, exclusions: string[]): Promise<User | null> {
    const user = await User.findByPk(id, {
      attributes: { exclude: exclusions as any },
    });
    return user;
  }

  async findWithExclusions(filter: WhereOptions, exclusions: string[]): Promise<User[]> {
    const users = await User.findAll({
      where: filter,
      attributes: { exclude: exclusions as any },
    });
    return users;
  }

  async findByIdWithIncludes(id: number, includes: any[]): Promise<User | null> {
    const user = await User.findByPk(id, {
      include: includes,
    });
    return user;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await User.findAll({
      where: { role },
    });
    return users;
  }
}
