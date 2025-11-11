import { User } from '../models/user.model';

export class UserSeeder {
  static async seed(): Promise<void> {
    try {
      // Check if users already have extended data
      const usersWithData = await User.count({
        where: {
          firstName: { [require('sequelize').Op.ne]: null },
        },
      });

      if (usersWithData > 0) {
        console.log('User extended data already seeded, skipping...');
        return;
      }

      console.log('Seeding user extended data...');

      // Update admin user with extended data
      await User.update(
        {
          firstName: 'Admin',
          lastName: 'User',
          primaryPhone: '+1234567890',
          preferences: {
            theme: 'dark',
            notifications: true,
            language: 'en',
          },
        },
        {
          where: { email: 'admin@example.com' },
        },
      );

      // Update regular user with extended data
      await User.update(
        {
          firstName: 'Regular',
          lastName: 'User',
          primaryPhone: '+0987654321',
          preferences: {
            theme: 'light',
            notifications: false,
            language: 'es',
          },
        },
        {
          where: { email: 'user@example.com' },
        },
      );

      console.log('User extended data seeded successfully!');
    } catch (error) {
      console.error('Error seeding user extended data:', error);
      throw error;
    }
  }
}
