# 🚀 Mini Tienda Online - Microservicios Node.js + TypeScript + Express + MySQL

## ✨ Características

- **Arquitectura de Microservicios**: Diseñada con un API Gateway para comunicación fluida entre servicios.
- **Poder de Express.js**: Aprovecha la flexibilidad y velocidad de Express.js para manejar solicitudes HTTP.
- **Brillo de TypeScript**: Disfruta los beneficios de TypeScript para seguridad de tipos y mejor experiencia de desarrollo.
- **ORM Sequelize v7**: Simplifica las interacciones con la base de datos usando Sequelize para MySQL, sin decoradores legacy.
- **Dockerización Completa**: Configuración de Docker Compose para despliegue y escalado sencillo, con MySQL en contenedor.
- **Autenticación JWT**: Seguridad con tokens JWT para acceso a recursos protegidos.
- **Logging Avanzado con Morgan**: Registro detallado de requests HTTP, errores y respuestas.
- **Manejo Robusto de Errores**: Middleware centralizado para 404, errores internos y validaciones.
- **Soft Deletes**: Soporte para eliminación lógica en modelos con paranoid.
- **Validaciones con Sequelize Validator**: Validaciones automáticas en modelos (email, etc.).

## 🏗️ Arquitectura

La aplicación sigue una arquitectura de microservicios escalable para una mini tienda online, separando responsabilidades en servicios independientes que se comunican vía HTTP/REST a través de un API Gateway.

### Diagrama Arquitectónico

```txt
┌────────────────────────────────────────────────────────────────┐
│                      👥 FRONTEND (React)                        │
│                HTTP/REST + JWT Bearer Token                    │
└──────────────────────────────┬─────────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────────┐
│                🚪 API GATEWAY (Port 3000)                       │
│           • Enrutamiento • JWT • Logging • CORS                │
└─────┬────────────┬────────────┬────────────┬────────────┬──────┘
      │            │            │            │            │
      ▼            ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│    🔐    │ │    👤    │ │    📦    │ │    🛒    │ │    💳    │
│   AUTH   │ │   USER   │ │ PRODUCT  │ │  ORDER   │ │ PAYMENT  │
│   :3001  │ │   :3002  │ │   :3003  │ │   :3004  │ │   :3005  │
│          │ │          │ │          │ │          │ │          │
│  • Login │ │  • CRUD  │ │  • CRUD  │ │  • CRUD  │ │  • Pagos │
│  • JWT   │ │  • Perfil│ │  • Stock │ │  • Items │ │  • Estado│
│  • Roles │ │  • Deletes│ │  • Precio│ │  • Estado│ │  • Valid │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │            │            │
     └────────────┴────────────┴────────────┴────────────┘
                               │
                               ▼
          ┌──────────────────────────────────────┐
          │    🗄️  MySQL 8.3 (Port 3306)         │
          │   Sequelize v7 • Soft Deletes        │
          │      Docker Volume Persist           │
          └──────────────────────────────────────┘
```

### 🏗️ Componentes Principales

| Componente             | Puerto | Responsabilidades                                                                                                                                                    |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **👥 Frontend**        | -      | • React SPA con gestión de estado<br>• Interfaz responsiva <br>• Consumo de APIs REST                                                                                |
| **🚪 API Gateway**     | 3000   | • Enrutamiento inteligente a microservicios<br>• Validación JWT y control de roles (RBAC)<br>• Logging<br>• CORS<br>• Manejo centralizado de errores                 |
| **🔐 Auth Service**    | 3001   | • Registro y login de usuarios<br>• Generación y validación de tokens JWT<br>• Gestión de roles (admin/user)                                                         |
| **👤 User Service**    | 3002   | • CRUD de perfiles de usuario<br>• Gestión de preferencias<br>• Soft deletes<br>• Relaciones SQL                                                                     |
| **📦 Product Service** | 3003   | • Catálogo de productos<br>• Control de stock y precios<br>• Validaciones de negocio<br>• Relaciones SQL                                                             |
| **🛒 Order Service**   | 3004   | • Gestión de pedidos<br>• Items de pedido<br>• Estados del pedido<br>• Relaciones SQL                                                                                |
| **💳 Payment Service** | 3005   | • Simulación de pagos<br>• Estados de transacciones<br>• Integración con servicios externos<br>• Validaciones de pago                                                |
| **🗄️ Database Layer**  | 3306   | • MySQL 8.3 en contenedor Docker<br>• Sequelize v7 como ORM<br>• Volúmenes persistentes<br>• Pool de conexiones con healthcheck<br>• Migraciones y seeds automáticas |

## 🔄 Flujo de Comunicación

1. Frontend → Gateway: Request HTTP con JWT
2. Gateway → Validación: Verifica token y permisos
3. Gateway → Microservicio: Rutea request al servicio correcto
4. Microservicio → Database: Query via Sequelize
5. Database → Microservicio: Response con datos
6. Microservicio → Gateway: Response procesada
7. Gateway → Frontend: Response final JSON

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

## 🔧 API Endpoints

_(Endpoints completos se documentarán en futuras versiones.)_

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

## 📂 Estructura del Proyecto

```
nodejs-express-microservice/
├── 📁 gateway-service/          # 🚪 API Gateway
│   ├── 📁 app/
│   │   └── 📄 server.ts         # Servidor Express con proxy
│   ├── 📁 config/
│   │   ├── 📄 db.config.ts      # Config DB (opcional)
│   │   └── 📄 index.ts
│   └── 📄 package.json
├── 📁 auth-service/             # 🔐 Servicio de Autenticación
│   ├── 📁 app/
│   │   └── 📄 server.ts         # Lógica de auth
│   ├── 📁 config/
│   │   ├── 📄 db.config.ts
│   │   └── 📄 index.ts
│   └── 📄 package.json
├── 📁 user-service/             # 👤 Servicio de Usuarios
│   ├── 📁 app/
│   │   └── 📄 server.ts         # Lógica de usuarios
│   ├── 📁 config/
│   │   ├── 📄 db.config.ts
│   │   ├── 📄 models.ts         # Inicialización modelos
│   │   └── 📄 index.ts
│   ├── 📁 models/
│   │   └── 📄 user.model.ts     # Modelo User (Sequelize v7)
│   ├── 📁 interfaces/
│   │   └── 📄 User.ts           # Tipos TypeScript
│   └── 📄 package.json
├── 📄 init.sh                   # 🛠️ Script instalación dependencias
├── 📄 schema.sql                # 🗄️ Esquema inicial DB
├── 📄 docker-compose.yml        # 🐳 Config Docker
├── 📄 .env                      # 🔑 Variables entorno
├── 📄 .env.example              # 📋 Ejemplo variables
└── 📄 README.md                 # 📖 Este archivo
```

## 🌐 API Endpoints (Ejemplos)

### Gateway Service

- `GET /` - Status del gateway.

### Auth Service

- `POST /auth/register` - Registro de usuario.
- `POST /auth/login` - Login y obtención JWT.

### User Service

- `GET /users/profile` - Obtener perfil (requiere JWT).
- `PUT /users/profile` - Actualizar perfil.

_(Endpoints completos se documentarán en futuras versiones.)_
