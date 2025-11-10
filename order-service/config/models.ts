import { sequelize } from './db.config';
import { Order } from '../models/order.model';
import { UserCache } from '../models/user-cache.model';
import { ProductCache } from '../models/product-cache.model';

export const initializeModels = () => {
  Order.initModel(sequelize);
  UserCache.initModel(sequelize);
  ProductCache.initModel(sequelize);
};
