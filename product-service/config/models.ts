import { sequelize } from "./db.config";
import { Product } from "../models/product.model";

export const initializeModels = () => {
  Product.initModel(sequelize);
};
