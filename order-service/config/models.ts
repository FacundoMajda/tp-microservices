import { sequelize } from './db.config';
import { Order } from '../models/order.model';

export const initializeModels = () => {
  Order.initModel(sequelize);
};
