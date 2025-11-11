# 💳 Payment Service

Servicio de procesamiento de pagos responsable de la gestión de transacciones, métodos de pago y estados de pago.

## 📋 Información General

- **Puerto**: 3005
- **Framework**: Express.js + TypeScript
- **Base de datos**: PostgreSQL 15
- **ORM**: Sequelize v7
- **Responsabilidades**: Pagos, transacciones, métodos de pago

## 🏗️ Arquitectura

```
Payment Service (Port 3005)
├── Controllers: PaymentController
├── Services: PaymentService
├── Models: Payment, Transaction (Sequelize)
├── Repository: PaymentRepository
├── Middleware: Auth, Error, Logging
├── Subscribers: Order events
└── Database: PostgreSQL (payment-db)
```

## 🔧 Funcionalidades

### 1. Procesamiento de Pagos

- **Payment Creation**: Creación de intents de pago
- **Payment Methods**: Soporte para múltiples métodos (tarjeta, PayPal, etc.)
- **Payment Processing**: Integración con gateways de pago
- **Transaction States**: Gestión de estados de transacción

### 2. Gestión de Transacciones

- **Transaction Logging**: Registro completo de todas las transacciones
- **Refund Processing**: Gestión de reembolsos y cancelaciones
- **Chargeback Handling**: Manejo de contracargos
- **Payment Reconciliation**: Conciliación automática

### 3. Seguridad y Compliance

- **PCI Compliance**: Manejo seguro de datos de pago
- **Encryption**: Encriptación de datos sensibles
- **Fraud Detection**: Detección básica de fraudes
- **Audit Trail**: Registro completo de auditoría

### 4. Integración con Pedidos

- **Order Sync**: Sincronización con Order Service vía eventos
- **Payment Updates**: Actualización automática de estados
- **Webhook Handling**: Procesamiento de webhooks de pago

## 📡 API Endpoints

### Gestión de Pagos

#### Crear Intent de Pago

```http
POST /payments/create-intent
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "orderId": 123,
  "amount": 1299.99,
  "currency": "USD",
  "paymentMethod": "credit_card",
  "paymentMethodDetails": {
    "cardNumber": "4111111111111111",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "cvv": "123"
  }
}
```

**Response (201):**

```json
{
  "paymentId": "pay_123456789",
  "clientSecret": "pi_secret_...",
  "status": "requires_payment_method",
  "amount": 1299.99,
  "currency": "USD"
}
```

#### Confirmar Pago

```http
POST /payments/confirm
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "paymentId": "pay_123456789",
  "paymentMethodId": "pm_123456789"
}
```

**Response (200):**

```json
{
  "paymentId": "pay_123456789",
  "status": "succeeded",
  "transactionId": "txn_123456789",
  "amount": 1299.99
}
```

#### Obtener Estado del Pago

```http
GET /payments/:paymentId
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "id": "pay_123456789",
  "orderId": 123,
  "status": "succeeded",
  "amount": 1299.99,
  "currency": "USD",
  "paymentMethod": "credit_card",
  "transactionId": "txn_123456789",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Listar Pagos del Usuario

```http
GET /payments
Authorization: Bearer <token>
```

#### Procesar Reembolso (Admin)

```http
POST /payments/:paymentId/refund
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "amount": 1299.99,
  "reason": "customer_request"
}
```

### Webhooks

#### Webhook de Gateway de Pago

```http
POST /payments/webhook
X-Signature: <gateway-signature>
```

## 🗄️ Modelo de Datos

### Payment Model (PostgreSQL)

```typescript
interface Payment {
  id: string; // UUID
  orderId: number;
  userId: number;
  status:
    | "pending"
    | "processing"
    | "succeeded"
    | "failed"
    | "cancelled"
    | "refunded";
  amount: number;
  currency: string;
  paymentMethod: string;
  gatewayPaymentId: string;
  gatewayTransactionId?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model

```typescript
interface Transaction {
  id: string; // UUID
  paymentId: string;
  type: "charge" | "refund" | "chargeback";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  gatewayTransactionId: string;
  description?: string;
  createdAt: Date;
}
```

### Validaciones

- **Amount**: Número positivo, máximo 999999.99
- **Currency**: Código ISO válido (USD, EUR, etc.)
- **Payment Method**: Solo métodos soportados
- **Order ID**: Debe existir un pedido válido

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3005
DB_HOST=payment-db
DB_PORT=5432
DB_NAME=payment_db
DB_USER=payment_user
DB_PASSWORD=payment_pass123
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ORDER_SERVICE_URL=http://order:3004
```

### Dependencias

- `express`: Framework web
- `sequelize`: ORM para PostgreSQL
- `pg`: Driver PostgreSQL
- `stripe`: SDK de Stripe para pagos
- `@tp-microservices/shared`: Tipos y EventBus compartidos

## 🔄 Eventos

### Eventos Emitidos

- `payment.processed`: Cuando un pago es exitoso
- `payment.failed`: Cuando un pago falla
- `payment.refunded`: Cuando se procesa un reembolso

### Eventos Suscritos

- `order.created`: Para iniciar procesamiento de pago
- `order.cancelled`: Para cancelar pagos pendientes

## 📊 Monitoreo

- Tasa de éxito de pagos
- Volumen de transacciones por día
- Métodos de pago más usados
- Tasa de reembolsos

## 🚀 Despliegue

```bash
docker-compose up --build payment
```

## 🔗 Integraciones

- **Order Service**: Sincronización de pedidos y pagos
- **Gateway**: Autenticación y autorización
- **Stripe/PayPal**: Gateways de pago externos
- **RabbitMQ**: Event-driven communication</content>
  <parameter name="filePath">C:\Users\IPF-2025\Desktop\tp-tlp4-microservices\docs\payment-service.md
