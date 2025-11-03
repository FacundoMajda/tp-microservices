import { sequelize } from './db.config';
import { Payment } from '../models/payment.model';

export const initializeModels = () => {
  Payment.initModel(sequelize);
};
