import { Request, Response } from 'express';
import { ProductRepository } from '../repository/product.repository';
import { ProductService } from '../services/product.service';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
  static async getAllProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.json({ success: true, data: products });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener productos' });
      return;
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(parseInt(id));
      if (!product) {
        res.status(404).json({ success: false, message: 'Producto no encontrado' });
        return;
      }
      res.json({ success: true, data: product });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener producto' });
      return;
    }
  }

  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, stock, category } = req.body;
      const newProduct = await productService.createProduct(
        {
          name,
          description,
          price,
          stock,
          category,
        },
        req.user as any,
      );
      res.status(201).json({ success: true, data: newProduct });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear producto' });
      return;
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category } = req.body;
      const updatedProduct = await productService.updateProduct(Number(id), {
        name,
        description,
        price,
        stock,
        category,
      });
      res.json({ success: true, data: updatedProduct });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar producto' });
      return;
    }
  }

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await productService.deleteProduct(parseInt(id));
      res.json({ success: true, message: 'Producto eliminado exitosamente' });
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar producto' });
      return;
    }
  }

  static async getProductsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const products = await productService.getProductsByCategory(category);
      res.json({ success: true, data: products });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener productos por categoría',
      });
      return;
    }
  }
}
