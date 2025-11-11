# 📚 Documentación de Servicios

Esta carpeta contiene la documentación detallada de cada microservicio del sistema.

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

## 🔧 Configuración y Despliegue

Ver [README principal](../README.md) para instrucciones de instalación y configuración.</content>
<parameter name="filePath">C:\Users\IPF-2025\Desktop\tp-tlp4-microservices\docs\README.md
