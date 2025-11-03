import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import { initializeDatabase, initializeModels } from "../config";
import {
  loggingMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "../middlewares";
import { setupHealthCheck } from "../utils/health";
import productRoutes from "../routes/product.routes";

const app = express();
const port = process.env.PRODUCT_SERVICE_PORT || 3003;

app.use(loggingMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
  initializeDatabase();
  initializeModels();
  console.log("Product Service DB initialized");
} catch (error) {
  console.log("Product Service DB init failed", error);
}

app.get("/", (_req, res) => {
  res.send("Product Service Status: OK");
});

app.use("/products", productRoutes);

app.get("/health", setupHealthCheck("Product Service"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Product Service running on port ${port}`);
});
