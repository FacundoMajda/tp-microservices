import { sequelize } from './db.config';
import { User } from '../models/user.model';

export const initializeModels = () => {
  User.initModel(sequelize);
};
