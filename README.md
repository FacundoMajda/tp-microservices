# 🚀 E-Commerce Microservices - Node.js + TypeScript + Event-Driven

## ✨ Características

- **🏗️ Arquitectura de Microservicios**: API Gateway + 5 servicios especializados
- **📡 Event-Driven**: RabbitMQ como message broker para comunicación asíncrona
- **🗄️ Múltiples Bases de Datos**: MySQL, PostgreSQL y MongoDB según necesidades
- **🔐 Autenticación JWT**: Sistema completo de auth con roles y permisos
- **📦 Shared Package**: Tipos y utilidades compartidas con TypeScript
- **🐳 Docker Completo**: Containerización total con health checks
- **🔄 Sincronización**: Event subscribers para consistencia de datos
- **📊 Monitoreo**: Health checks y métricas por servicio

## 🛠️ Servicios & Tech Stack

## 📋 Índice de Servicios

### 🚪 [API Gateway](./gateway-service.md)

- Enrutamiento inteligente
- Autenticación JWT
- Health checks
- Proxy middleware

### 🔐 [Auth Service](./auth-service.md)

- Autenticación y autorización
- Gestión de JWT
- Roles y permisos
- Base de datos MySQL

### 👤 [User Service](./user-service.md)

- CRUD de usuarios
- Perfiles de usuario
- Gestión de preferencias
- Base de datos MySQL

### 📦 [Product Service](./product-service.md)

- Catálogo de productos
- Control de inventario
- Gestión de stock
- Base de datos MongoDB

### 🛒 [Order Service](./order-service.md)

- Gestión de pedidos
- Carrito de compras
- Estados de orden
- Base de datos PostgreSQL

### 💳 [Payment Service](./payment-service.md)

- Procesamiento de pagos
- Estados de transacción
- Integración con pasarelas
- Base de datos PostgreSQL

## 🏗️ Arquitectura General

### Event-Driven Architecture

- **RabbitMQ** como message broker
- **Event Bus** compartido entre servicios
- **Eventos tipados** con TypeScript
- Comunicación asíncrona entre servicios

### Bases de Datos

- **MySQL 8.3**: Auth Service, User Service
- **PostgreSQL 15**: Order Service, Payment Service
- **MongoDB 7**: Product Service

### Comunicación

- **HTTP/REST**: Frontend ↔ Gateway ↔ Services
- **AMQP**: Services ↔ Services (eventos)

### Seguridad

- **JWT (JSON Web Tokens)** - Autenticación stateless
- **bcrypt** - Hashing de contraseñas
- **RBAC (Role-Based Access Control)** - Control de permisos

### DevOps & Containerización

- **Docker & Docker Compose** - Containerización completa
- **Health Checks** - Monitoreo de servicios
- **Volume Persistence** - Datos persistentes

## 🏗️ Arquitectura

La aplicación sigue una arquitectura de microservicios event-driven para un e-commerce escalable.

### Diagrama Arquitectónico

```txt
┌─────────────────────────────────────────────────────────────────────┐
│                        👥 FRONTEND (React)                          │
│                HTTP/REST + JWT Bearer Token                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                🚪 API GATEWAY (Port 3000)                          │
│           • Enrutamiento • JWT • Health Checks • CORS              │
└─────┬────────────┬────────────┬────────────┬────────────┬───────────┘
      │            │            │            │            │
      ▼            ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│    🔐    │ │    👤    │ │    📦    │ │    🛒    │ │    💳    │
│   AUTH   │ │   USER   │ │ PRODUCT  │ │  ORDER   │ │ PAYMENT  │
│   :3001  │ │   :3002  │ │   :3003  │ │   :3004  │ │   :3005  │
│          │ │          │ │          │ │          │ │          │
│ • MySQL  │ │ • MySQL  │ │ • MongoDB│ │ • Postgre│ │ • Postgre│
│ • JWT    │ │ • CRUD   │ │ • Stock  │ │ • Cart   │ │          │
│ • Roles  │ │ • Soft   │ │ • Cache  │ │ • States │ │          |
│ • Events │ │ • Delete │ │ • Events │ │ • Events │ │ • Events │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │            │            │
     └────────────┴────────────┴────────────┴────────────┘
                               │
                               ▼
          ┌─────────────────────────────────────────────────────┐
          │         📡 RABBITMQ (Port 5672/15672)               │
          │   • Event Bus • Message Queue • Topic Exchange      │
          │   • Async Communication • Service Decoupling        │
          └─────────────────────────────────────────────────────┘
```

### 🏗️ Componentes Principales

| Componente      | Puerto     | Base de Datos | Responsabilidades                        |
| --------------- | ---------- | ------------- | ---------------------------------------- |
| **🚪 Gateway**  | 3000       | -             | Enrutamiento, auth, health checks, proxy |
| **🔐 Auth**     | 3001       | MySQL         | Login/registro, JWT, roles, eventos      |
| **👤 User**     | 3002       | MySQL         | Perfiles, preferencias, soft deletes     |
| **📦 Product**  | 3003       | MongoDB       | Catálogo, stock, precios, caché          |
| **🛒 Order**    | 3004       | PostgreSQL    | Carrito, pedidos, estados, items         |
| **💳 Payment**  | 3005       | PostgreSQL    | Pagos, transacciones, reembolsos         |
| **� RabbitMQ**  | 5672/15672 | -             | Message broker, event-driven comm        |
| **👥 Frontend** | 80         | -             | React SPA, API consumption               |

## 🔄 Flujo de Comunicación

### HTTP/REST Flow

1. **Frontend → Gateway**: Request HTTP con JWT Bearer Token
2. **Gateway → Validación**: Verifica token, permisos y enruta
3. **Gateway → Microservicio**: Proxy al servicio correspondiente
4. **Microservicio → Database**: Query según tipo de DB (MySQL/PostgreSQL/MongoDB)
5. **Database → Microservicio**: Response con datos
6. **Microservicio → Gateway**: Response procesada
7. **Gateway → Frontend**: Response final JSON

### Event-Driven Flow

1. **Servicio → RabbitMQ**: Publica evento (ej: `user.created`, `order.paid`)
2. **RabbitMQ → Subscribers**: Distribuye a servicios interesados
3. **Subscriber → Acción**: Actualiza caché, envía notificaciones, etc.
4. **Subscriber → Database**: Actualiza datos relacionados
5. **Subscriber → RabbitMQ**: Puede publicar eventos secundarios

### Ejemplos de Eventos

- `auth.user.registered` → User Service actualiza perfil
- `product.stock.updated` → Order Service valida disponibilidad
- `order.created` → Payment Service inicia transacción
- `payment.completed` → Order Service marca como pagado

## 🛡️ Seguridad

- JWT Bearer Tokens para autenticación
- RBAC (Role-Based Access Control)
- CORS configurado
- Validaciones a nivel de modelo y controlador
- Soft Deletes

## 🐳 Stack Tecnológico

- Runtime: Node.js
- Framework: Express.js
- Lenguaje: TypeScript (>=5.0)
- ORM: Sequelize v7
- Database: MySQL 8.3
- Auth: JWT (jsonwebtoken)
- Logging: Morgan
- Containerización: Docker + Docker Compose

## 🌱 Seeding de Datos

El sistema incluye seeding automático de datos de prueba que se ejecuta al iniciar cada servicio. Los seeders verifican si ya existen datos antes de insertar nuevos registros.

### 📊 Datos de Prueba Incluidos

#### 👥 **Usuarios (Auth + User Services)**

- **Admin**: `admin@example.com` / `admin123`
- **Usuario Regular**: `user@example.com` / `user123`

#### 📦 **Productos (Product Service)**

- **60 productos** obtenidos de [DummyJSON API](https://dummyjson.com/products)
- Incluye laptops, teléfonos, ropa, electrónicos, etc.
- Stock y precios realistas

#### 🛒 **Pedidos (Order Service)**

- **3 pedidos de ejemplo** con diferentes estados:
  - Pedido entregado (usuario regular)
  - Pedido pendiente (usuario regular)
  - Pedido confirmado (admin)

#### 💳 **Pagos (Payment Service)**

- **Pagos correspondientes** a los pedidos creados
- Estados: `completed`, `pending`
- Métodos: `card`, `paypal`, `bank_transfer`

### 🔄 Comportamiento del Seeding

- **Solo se ejecuta si no hay datos**: Los seeders verifican la existencia de registros antes de insertar
- **Ejecución automática**: Se ejecuta al iniciar cada servicio
- **Logs informativos**: Muestra progreso y confirmación de seeding
- **Reutilizable**: Puede ejecutarse múltiples veces sin duplicar datos

### 🚀 Inicio con Seeding

```bash
# Ejecutar todos los servicios con seeding automático
./seed.sh

# O iniciar servicios individualmente
cd auth-service && npm run dev      # Crea usuarios
cd product-service && npm run dev   # Descarga 60 productos
cd order-service && npm run dev     # Crea pedidos de ejemplo
cd payment-service && npm run dev   # Crea pagos relacionados
```

### 📋 Usuarios de Prueba

| Email               | Contraseña | Rol   | Descripción            |
| ------------------- | ---------- | ----- | ---------------------- |
| `admin@example.com` | `admin123` | admin | Administrador completo |
| `user@example.com`  | `user123`  | user  | Usuario regular        |

## 🔧 API Endpoints

### 🚪 Gateway Service (Port 3000)

| Método | Endpoint  | Descripción                         | Auth |
| ------ | --------- | ----------------------------------- | ---- |
| `GET`  | `/`       | Estado del gateway                  | ❌   |
| `GET`  | `/health` | Health check de todos los servicios | ❌   |

**Health Check Response:**

```json
{
  "services": [
    {
      "name": "auth",
      "status": "healthy",
      "latency": 45
    }
  ]
}
```

### 🔐 Auth Service (Port 3001)

| Método | Endpoint         | Descripción             | Auth |
| ------ | ---------------- | ----------------------- | ---- |
| `POST` | `/auth/register` | Registrar nuevo usuario | ❌   |
| `POST` | `/auth/login`    | Login y obtener JWT     | ❌   |
| `POST` | `/auth/verify`   | Verificar token JWT     | ❌   |

#### POST /auth/register

```json
// Request
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}

// Response (201)
{
  "user": {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/login

```json
// Request
{
  "email": "string",
  "password": "string"
}

// Response (200)
{
  "user": {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/verify

```json
// Headers: Authorization: Bearer <token>

// Response (200)
{
  "id": 1,
  "email": "string",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 👤 User Service (Port 3002)

| Método   | Endpoint                 | Descripción                | Auth           |
| -------- | ------------------------ | -------------------------- | -------------- |
| `GET`    | `/users`                 | Obtener todos los usuarios | ✅ Admin       |
| `GET`    | `/users/:id`             | Obtener usuario por ID     | ✅ Owner/Admin |
| `POST`   | `/users`                 | Crear nuevo usuario        | ❌             |
| `PUT`    | `/users/:id`             | Actualizar usuario         | ✅ Owner/Admin |
| `DELETE` | `/users/:id`             | Soft delete usuario        | ✅ Owner/Admin |
| `PUT`    | `/users/:id/preferences` | Actualizar preferencias    | ✅ Owner/Admin |

#### GET /users/:id

```json
// Response (200)
{
  "id": 1,
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "user",
  "primaryPhone": "string",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /users/:id/preferences

```json
// Request
{
  "theme": "light",
  "notifications": false,
  "language": "es"
}

// Response (200)
{
  "message": "Preferences updated successfully",
  "preferences": {
    "theme": "light",
    "notifications": false,
    "language": "es"
  }
}
```

### 📦 Product Service (Port 3003)

| Método   | Endpoint                       | Descripción                 | Auth     |
| -------- | ------------------------------ | --------------------------- | -------- |
| `GET`    | `/products`                    | Obtener todos los productos | ✅       |
| `GET`    | `/products/:id`                | Obtener producto por ID     | ✅       |
| `GET`    | `/products/category/:category` | Productos por categoría     | ✅       |
| `POST`   | `/products`                    | Crear nuevo producto        | ✅ Admin |
| `PUT`    | `/products/:id`                | Actualizar producto         | ✅ Admin |
| `DELETE` | `/products/:id`                | Soft delete producto        | ✅ Admin |

#### GET /products

```json
// Query params: ?page=1&limit=10&category=electronics

// Response (200)
{
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Laptop Gaming",
      "description": "High-performance gaming laptop",
      "price": 1299.99,
      "stock": 50,
      "category": "electronics",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### POST /products

```json
// Request
{
  "name": "Wireless Headphones",
  "description": "Noise-cancelling wireless headphones",
  "price": 199.99,
  "stock": 100,
  "category": "electronics"
}

// Response (201)
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "Noise-cancelling wireless headphones",
  "price": 199.99,
  "stock": 100,
  "category": "electronics",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 🛒 Order Service (Port 3004)

| Método   | Endpoint                 | Descripción                | Auth           |
| -------- | ------------------------ | -------------------------- | -------------- |
| `GET`    | `/orders`                | Obtener todos los pedidos  | ✅ Admin       |
| `GET`    | `/orders/:id`            | Obtener pedido por ID      | ✅ Owner/Admin |
| `GET`    | `/orders/user/me`        | Pedidos del usuario actual | ✅             |
| `GET`    | `/orders/status/:status` | Pedidos por estado         | ✅ Admin       |
| `POST`   | `/orders`                | Crear nuevo pedido         | ✅             |
| `PUT`    | `/orders/:id`            | Actualizar pedido          | ✅ Admin       |
| `DELETE` | `/orders/:id`            | Soft delete pedido         | ✅ Admin       |

#### POST /orders

```json
// Request
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2
    },
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 1
    }
  ]
}

// Response (201)
{
  "id": 1,
  "userId": 1,
  "status": "pending",
  "total": 2699.98,
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 1299.99
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /orders/user/me

```json
// Response (200)
{
  "orders": [
    {
      "id": 1,
      "status": "pending",
      "total": 2699.98,
      "items": [...],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

### 💳 Payment Service (Port 3005)

| Método   | Endpoint                   | Descripción             | Auth     |
| -------- | -------------------------- | ----------------------- | -------- |
| `GET`    | `/payments`                | Obtener todos los pagos | ✅ Admin |
| `GET`    | `/payments/:id`            | Obtener pago por ID     | ✅ Admin |
| `GET`    | `/payments/order/:orderId` | Pagos por orderId       | ✅ Admin |
| `GET`    | `/payments/status/:status` | Pagos por estado        | ✅ Admin |
| `POST`   | `/payments`                | Crear nuevo pago        | ✅       |
| `PUT`    | `/payments/:id`            | Actualizar pago         | ✅ Admin |
| `DELETE` | `/payments/:id`            | Soft delete pago        | ✅ Admin |
| `POST`   | `/payments/:id/process`    | Procesar pago           | ✅ Admin |

#### POST /payments

```json
// Request
{
  "orderId": 1,
  "amount": 2699.98,
  "method": "card"
}

// Response (201)
{
  "id": 1,
  "orderId": 1,
  "amount": 2699.98,
  "status": "pending",
  "method": "card",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /payments/:id/process

```json
// Response (200)
{
  "id": 1,
  "status": "completed",
  "transactionId": "txn_1234567890",
  "processedAt": "2024-01-01T00:00:00.000Z"
}
```

### 📋 Códigos de Estado HTTP

| Código | Descripción                                |
| ------ | ------------------------------------------ |
| `200`  | OK - Operación exitosa                     |
| `201`  | Created - Recurso creado                   |
| `400`  | Bad Request - Datos inválidos              |
| `401`  | Unauthorized - Token faltante/inválido     |
| `403`  | Forbidden - Permisos insuficientes         |
| `404`  | Not Found - Recurso no encontrado          |
| `409`  | Conflict - Conflicto de datos              |
| `500`  | Internal Server Error - Error del servidor |

### 🔑 Autenticación

Todos los endpoints protegidos requieren un **JWT Bearer Token** en el header:

```http
Authorization: Bearer <your_jwt_token>
```

**Roles disponibles:**

- `user`: Usuario regular
- `admin`: Administrador con permisos completos

**Permisos por endpoint:**

- **Owner**: Solo el propietario del recurso
- **Admin**: Solo administradores
- **Owner/Admin**: Propietario o administrador

## 🚀 Instalación y Ejecución

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/FacundoMajda/tp-microservices
   cd tp-microservices
   ```

2. **Configura variables de entorno**:

   - Copia `.env.example` a `.env` y ajusta las variables (DB, puertos, etc.).

3. **Instala dependencias**:

   ```bash
   ./init.sh
   ```

4. **Ejecuta con Docker**:

   ```bash
   docker-compose up --build
   ```

5. **Accede a los servicios**:
   - Gateway: `http://localhost:3000`
   - Auth Service: `http://localhost:3001`
   - User Service: `http://localhost:3002`
   - Product Service: `http://localhost:3003`
   - Order Service: `http://localhost:3004`
   - Payment Service: `http://localhost:3005`
