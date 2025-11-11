# 👤 User Service

Servicio de gestión de usuarios responsable del CRUD completo de perfiles de usuario, preferencias y datos personales.

## 📋 Información General

- **Puerto**: 3002
- **Framework**: Express.js + TypeScript
- **Base de datos**: MySQL 8.3
- **ORM**: Sequelize v7
- **Responsabilidades**: CRUD usuarios, perfiles, preferencias

## 🏗️ Arquitectura

```
User Service (Port 3002)
├── Controllers: UserController
├── Services: UserService
├── Models: User (Sequelize)
├── Middleware: Auth, Error, Logging
├── Subscribers: Auth events
└── Database: MySQL (user-db)
```

## 🔧 Funcionalidades

### 1. Gestión de Perfiles

- **CRUD Completo**: Crear, leer, actualizar, eliminar usuarios
- **Soft Deletes**: Eliminación lógica con recuperación
- **Profile Updates**: Actualización de información personal
- **Preferences**: Gestión de preferencias de usuario

### 2. Sincronización de Eventos

- **Event Subscribers**: Escucha eventos del Auth Service
- **Data Sync**: Sincronización automática con Auth Service
- **Cache Updates**: Actualización de caché local

### 3. Validación y Seguridad

- **Input Validation**: Validación completa de datos
- **Authorization**: Control de acceso basado en roles
- **Data Sanitization**: Limpieza de datos de entrada

## 📡 API Endpoints

### Gestión de Usuarios

#### Obtener Perfil (Propio)

```http
GET /users/profile
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Actualizar Perfil

```http
PUT /users/profile
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "John Smith",
  "preferences": {
    "theme": "light",
    "notifications": false
  }
}
```

**Response (200):**

```json
{
  "message": "Perfil actualizado exitosamente",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Smith",
    "preferences": {
      "theme": "light",
      "notifications": false
    }
  }
}
```

#### Listar Usuarios (Admin)

```http
GET /users
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `search`: Búsqueda por nombre o email

#### Obtener Usuario por ID (Admin)

```http
GET /users/:id
Authorization: Bearer <admin-token>
```

#### Actualizar Usuario (Admin)

```http
PUT /users/:id
Authorization: Bearer <admin-token>
```

#### Eliminar Usuario (Admin)

```http
DELETE /users/:id
Authorization: Bearer <admin-token>
```

## 🗄️ Modelo de Datos

### User Model (MySQL)

```typescript
interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user";
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Soft delete
}
```

### Validaciones

- **Email**: Formato válido, único
- **Name**: 2-100 caracteres, solo letras y espacios
- **Role**: Solo valores permitidos
- **Preferences**: JSON válido con estructura definida

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3002
DB_HOST=user-db
DB_PORT=3306
DB_NAME=user_db
DB_USER=user_user
DB_PASSWORD=user_pass123
JWT_SECRET=your-super-secret-jwt-key
```

### Dependencias

- `express`: Framework web
- `sequelize`: ORM para MySQL
- `mysql2`: Driver MySQL
- `@tp-microservices/shared`: Tipos y EventBus compartidos

## 🔄 Eventos

### Eventos Emitidos

- `user.updated`: Cuando se actualiza información del usuario
- `user.deleted`: Cuando se elimina un usuario

### Eventos Suscritos

- `user.created`: Sincronización desde Auth Service
- `user.updated`: Actualización desde Auth Service
- `user.deleted`: Eliminación desde Auth Service

## 📊 Monitoreo

- Contadores de usuarios activos
- Tasa de actualización de perfiles
- Eventos procesados correctamente
- Errores de sincronización

## 🚀 Despliegue

```bash
docker-compose up --build user
```

## 🔗 Integraciones

- **Auth Service**: Sincronización de datos de usuario vía eventos
- **Gateway**: Autenticación y autorización
- **RabbitMQ**: Event-driven communication</content>
  <parameter name="filePath">C:\Users\IPF-2025\Desktop\tp-tlp4-microservices\docs\user-service.md
