# 🔐 Auth Service

Servicio de autenticación y autorización responsable de la gestión de usuarios, login, registro y validación de tokens JWT.

## 📋 Información General

- **Puerto**: 3001
- **Framework**: Express.js + TypeScript
- **Base de datos**: MySQL 8.3
- **ORM**: Sequelize v7
- **Responsabilidades**: Autenticación, JWT, roles, permisos

## 🏗️ Arquitectura

```
Auth Service (Port 3001)
├── Controllers: AuthController
├── Services: AuthService
├── Models: User (Sequelize)
├── Middleware: Auth, Error, Logging
└── Database: MySQL (auth-db)
```

## 🔧 Funcionalidades

### 1. Autenticación de Usuarios

- **Registro**: Creación de nuevos usuarios con validación
- **Login**: Autenticación con email/password
- **JWT Generation**: Tokens de acceso con expiración
- **Password Hashing**: bcrypt para seguridad

### 2. Gestión de Roles

- **RBAC**: Role-Based Access Control
- **Roles**: `admin`, `user`
- **Permisos**: Basados en roles del usuario

### 3. Validación JWT

- **Token Verification**: Validación de tokens en requests
- **Claims Extraction**: Extracción de información del usuario
- **Token Refresh**: Renovación de tokens expirados

### 4. Seguridad

- **Password Policies**: Requisitos de complejidad
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **Input Validation**: Sanitización y validación de datos

## 📡 API Endpoints

### Autenticación

#### Registro de Usuario

```http
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response (201):**

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Verificar Token

```http
GET /auth/verify
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

## 🗄️ Modelo de Datos

### User Model (MySQL)

```typescript
interface User {
  id: number;
  email: string;
  password: string; // Hashed
  name: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}
```

### Validaciones

- **Email**: Formato válido, único
- **Password**: Mínimo 8 caracteres, mayúsculas, minúsculas, números
- **Name**: No vacío, máximo 100 caracteres

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3001
DB_HOST=auth-db
DB_PORT=3306
DB_NAME=auth_db
DB_USER=auth_user
DB_PASSWORD=auth_pass123
JWT_SECRET=your-super-secret-jwt-key
```

### Dependencias

- `express`: Framework web
- `sequelize`: ORM para MySQL
- `mysql2`: Driver MySQL
- `bcrypt`: Hashing de passwords
- `jsonwebtoken`: JWT tokens
- `joi`: Validación de datos

## 🔄 Eventos

### Eventos Emitidos

- `user.created`: Cuando se registra un nuevo usuario
- `user.updated`: Cuando se actualiza información del usuario
- `user.deleted`: Cuando se elimina un usuario

### Eventos Suscritos

- Ninguno (servicio fuente de autenticación)

## 📊 Monitoreo

- Logs de autenticación exitosa/fallida
- Contadores de registros por día
- Tasa de éxito de login
- Tokens expirados/inválidos

## 🚀 Despliegue

```bash
docker-compose up --build auth
```

## 🔗 Integraciones

- **Gateway**: Validación de tokens JWT
- **User Service**: Sincronización de datos de usuario
- **RabbitMQ**: Publicación de eventos de usuario
