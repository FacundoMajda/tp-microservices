import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export class UserSeeder {
  static async seed(): Promise<void> {
    try {
      const existingUsers = await User.count();
      if (existingUsers > 0) {
        console.log('Users already seeded, skipping...');
        return;
      }
      console.log('Seeding users...');
      const saltRounds = 10;
      const adminPassword = await bcrypt.hash('admin123', saltRounds);
      await User.create({
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin',
      });
      const userPassword = await bcrypt.hash('user123', saltRounds);
      await User.create({
        email: 'user@example.com',
        password: userPassword,
        role: 'user',
      });
      console.log('Users seeded successfully!');
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }
}
