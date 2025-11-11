# 📦 Product Service

Servicio de gestión de productos responsable del catálogo, inventario y control de stock usando MongoDB.

## 📋 Información General

- **Puerto**: 3003
- **Framework**: Express.js + TypeScript
- **Base de datos**: MongoDB 7
- **ODM**: Mongoose
- **Responsabilidades**: Catálogo, inventario, stock, precios

## 🏗️ Arquitectura

```
Product Service (Port 3003)
├── Controllers: ProductController
├── Services: ProductService
├── Models: Product (Mongoose)
├── Middleware: Auth, Error, Logging
├── Subscribers: Order events
└── Database: MongoDB (product-db)
```

## 🔧 Funcionalidades

### 1. Gestión de Catálogo

- **CRUD Productos**: Crear, leer, actualizar, eliminar productos
- **Categorización**: Organización por categorías
- **Búsqueda**: Búsqueda full-text por nombre y descripción
- **Paginación**: Listado paginado de productos

### 2. Control de Inventario

- **Stock Management**: Control de cantidades disponibles
- **Stock Reservations**: Reserva temporal para pedidos
- **Low Stock Alerts**: Alertas de stock bajo
- **Stock History**: Historial de cambios de inventario

### 3. Precios y Descuentos

- **Price Management**: Gestión de precios base
- **Discounts**: Sistema de descuentos por producto
- **Price History**: Historial de cambios de precio
- **Bulk Updates**: Actualización masiva de precios

### 4. Sincronización de Eventos

- **Order Events**: Escucha eventos de pedidos para reservas
- **Stock Updates**: Actualización automática de stock
- **Cache Invalidation**: Invalidación de caché en otros servicios

## 📡 API Endpoints

### Gestión de Productos

#### Listar Productos

```http
GET /products
```

**Query Parameters:**

- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `category`: Filtrar por categoría
- `search`: Búsqueda por nombre/descripción
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo
- `inStock`: Solo productos con stock (true/false)

**Response (200):**

```json
{
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Laptop Gaming",
      "description": "Potente laptop para gaming",
      "price": 1299.99,
      "category": "electronics",
      "stock": 15,
      "images": ["url1.jpg", "url2.jpg"],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10
}
```

#### Obtener Producto por ID

```http
GET /products/:id
```

#### Crear Producto (Admin)

```http
POST /products
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del producto",
  "price": 99.99,
  "category": "categoria",
  "stock": 100,
  "images": ["url1.jpg"]
}
```

#### Actualizar Producto (Admin)

```http
PUT /products/:id
Authorization: Bearer <admin-token>
```

#### Eliminar Producto (Admin)

```http
DELETE /products/:id
Authorization: Bearer <admin-token>
```

### Categorías

#### Listar Categorías

```http
GET /products/categories
```

**Response (200):**

```json
[
  {
    "slug": "electronics",
    "name": "Electrónicos",
    "url": "/categories/electronics"
  }
]
```

#### Productos por Categoría

```http
GET /products/category/:category
```

## 🗄️ Modelo de Datos

### Product Model (MongoDB)

```typescript
interface Product {
  _id: ObjectId; // MongoDB ObjectId
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Validaciones

- **Name**: 2-200 caracteres, requerido
- **Description**: Máximo 1000 caracteres
- **Price**: Número positivo, máximo 999999.99
- **Category**: String no vacío
- **Stock**: Número entero no negativo
- **Images**: Array de URLs válidas (máximo 10)

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3003
MONGODB_URI=mongodb://product-user:product-pass123@product-db:27017/product_db
JWT_SECRET=your-super-secret-jwt-key
```

### Dependencias

- `express`: Framework web
- `mongoose`: ODM para MongoDB
- `@tp-microservices/shared`: Tipos y EventBus compartidos

## 🔄 Eventos

### Eventos Emitidos

- `product.created`: Cuando se crea un nuevo producto
- `product.updated`: Cuando se actualiza un producto
- `product.deleted`: Cuando se elimina un producto
- `product.stock.reserved`: Cuando se reserva stock para un pedido
- `product.stock.released`: Cuando se libera stock reservado

### Eventos Suscritos

- `order.created`: Para reservar stock automáticamente
- `order.cancelled`: Para liberar stock reservado

## 📊 Monitoreo

- Niveles de stock por producto
- Productos sin stock
- Tasa de rotación de inventario
- Eventos de stock procesados

## 🚀 Despliegue

```bash
docker-compose up --build product
```

## 🔗 Integraciones

- **Order Service**: Reserva/liberación de stock vía eventos
- **Gateway**: Autenticación y autorización
- **RabbitMQ**: Event-driven communication</content>
  <parameter name="filePath">C:\Users\IPF-2025\Desktop\tp-tlp4-microservices\docs\product-service.md
