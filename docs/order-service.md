# 🛒 Order Service

Servicio de gestión de pedidos responsable del carrito de compras, procesamiento de órdenes y estados de pedido.

## 📋 Información General

- **Puerto**: 3004
- **Framework**: Express.js + TypeScript
- **Base de datos**: PostgreSQL 15
- **ORM**: Sequelize v7
- **Responsabilidades**: Pedidos, carrito, estados, items

## 🏗️ Arquitectura

```
Order Service (Port 3004)
├── Controllers: OrderController
├── Services: OrderService
├── Models: Order, OrderItem (Sequelize)
├── Repository: OrderRepository
├── Middleware: Auth, Error, Logging
├── Subscribers: Product, Payment, User events
└── Database: PostgreSQL (order-db)
```

## 🔧 Funcionalidades

### 1. Gestión de Carrito

- **Carrito Temporal**: Almacenamiento de items antes de checkout
- **Validación de Stock**: Verificación de disponibilidad en tiempo real
- **Cálculo de Totales**: Subtotales, impuestos, descuentos
- **Persistencia**: Carritos guardados por usuario

### 2. Procesamiento de Pedidos

- **Order Creation**: Creación de pedidos desde carrito
- **Stock Reservation**: Reserva automática de inventario
- **Order States**: Gestión de estados (pending, confirmed, shipped, delivered)
- **Order History**: Historial completo de cambios

### 3. Integración con Pagos

- **Payment Processing**: Comunicación con Payment Service
- **Order Updates**: Actualización automática por eventos de pago
- **Refund Handling**: Gestión de reembolsos y cancelaciones

### 4. Sincronización de Datos

- **Event Subscribers**: Escucha eventos de productos y pagos
- **Cache Management**: Caché local de productos y usuarios
- **Data Consistency**: Sincronización entre servicios

## 📡 API Endpoints

### Gestión de Carrito

#### Obtener Carrito

```http
GET /orders/cart
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "id": "cart-123",
  "userId": 1,
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Laptop Gaming",
      "price": 1299.99,
      "quantity": 1,
      "subtotal": 1299.99
    }
  ],
  "total": 1299.99,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Agregar Item al Carrito

```http
POST /orders/cart/items
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

#### Actualizar Item del Carrito

```http
PUT /orders/cart/items/:productId
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "quantity": 3
}
```

#### Eliminar Item del Carrito

```http
DELETE /orders/cart/items/:productId
Authorization: Bearer <token>
```

### Gestión de Pedidos

#### Crear Pedido desde Carrito

```http
POST /orders
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "shippingAddress": {
    "street": "Calle 123",
    "city": "Ciudad",
    "country": "País",
    "postalCode": "12345"
  },
  "paymentMethod": "credit_card"
}
```

**Response (201):**

```json
{
  "id": 123,
  "userId": 1,
  "status": "pending",
  "total": 1299.99,
  "items": [...],
  "shippingAddress": {...},
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Listar Pedidos del Usuario

```http
GET /orders
Authorization: Bearer <token>
```

#### Obtener Pedido por ID

```http
GET /orders/:id
Authorization: Bearer <token>
```

#### Cancelar Pedido

```http
PUT /orders/:id/cancel
Authorization: Bearer <token>
```

#### Listar Todos los Pedidos (Admin)

```http
GET /orders/admin/all
Authorization: Bearer <admin-token>
```

## 🗄️ Modelo de Datos

### Order Model (PostgreSQL)

```typescript
interface Order {
  id: number;
  userId: number;
  status:
    | "pending"
    | "confirmed"
    | "paid"
    | "shipped"
    | "delivered"
    | "cancelled";
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### OrderItem Model

```typescript
interface OrderItem {
  id: number;
  orderId: number;
  productId: string; // MongoDB ObjectId
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}
```

### Validaciones

- **Status**: Solo valores permitidos en la enumeración
- **Total**: Número positivo
- **Items**: Al menos un item por pedido
- **Stock**: Validación de disponibilidad antes de crear pedido

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3004
DB_HOST=order-db
DB_PORT=5432
DB_NAME=order_db
DB_USER=order_user
DB_PASSWORD=order_pass123
JWT_SECRET=your-super-secret-jwt-key
PRODUCT_SERVICE_URL=http://product:3003
PAYMENT_SERVICE_URL=http://payment:3005
USER_SERVICE_URL=http://user:3002
```

### Dependencias

- `express`: Framework web
- `sequelize`: ORM para PostgreSQL
- `pg`: Driver PostgreSQL
- `@tp-microservices/shared`: Tipos y EventBus compartidos

## 🔄 Eventos

### Eventos Emitidos

- `order.created`: Cuando se crea un nuevo pedido
- `order.updated`: Cuando cambia el estado del pedido
- `order.cancelled`: Cuando se cancela un pedido

### Eventos Suscritos

- `product.stock.reserved`: Confirmación de reserva de stock
- `product.stock.released`: Liberación de stock
- `payment.processed`: Actualización por pago exitoso
- `payment.failed`: Actualización por pago fallido
- `user.updated`: Actualización de datos de usuario

## 📊 Monitoreo

- Número de pedidos por día
- Tasa de conversión carrito → pedido
- Estados de pedidos
- Eventos procesados correctamente

## 🚀 Despliegue

```bash
docker-compose up --build order
```

## 🔗 Integraciones

- **Product Service**: Validación de stock y reservas
- **Payment Service**: Procesamiento de pagos
- **User Service**: Datos de usuario
- **Gateway**: Autenticación y autorización
- **RabbitMQ**: Event-driven communication</content>
  <parameter name="filePath">C:\Users\IPF-2025\Desktop\tp-tlp4-microservices\docs\order-service.md
