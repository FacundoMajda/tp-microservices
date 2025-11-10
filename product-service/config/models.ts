// MongoDB models are initialized when imported
// No need for initializeModels function with Mongoose
import '../models/product.model';

export const initializeModels = () => {
  // Models are auto-initialized with Mongoose
  console.log('✅ Product models loaded (MongoDB)');
};
