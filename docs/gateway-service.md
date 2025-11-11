# 🚪 API Gateway Service

El API Gateway es el punto de entrada único para todas las comunicaciones entre el frontend y los microservicios backend.

## 📋 Información General

- **Puerto**: 3000
- **Framework**: Express.js + TypeScript
- **Base de datos**: No aplica (proxy)
- **Responsabilidades**: Enrutamiento, autenticación, logging, health checks

## 🏗️ Arquitectura

```
Frontend (React)
    ↓ HTTP/REST + JWT
API Gateway (Port 3000)
    ↓ Proxy con validación
Microservicios (3001-3005)
```

## 🔧 Funcionalidades

### 1. Enrutamiento Inteligente

- Proxy requests a servicios específicos basado en URL path
- Balanceo de carga automático
- Timeout handling

### 2. Autenticación JWT

- Validación de tokens Bearer
- Extracción de claims de usuario
- Inyección de headers de autenticación

### 3. Health Checks

- Endpoint `/health` para monitoreo
- Verificación de conectividad con todos los servicios
- Métricas de latencia por servicio

### 4. Middleware

- **Logging**: Morgan para requests HTTP
- **CORS**: Configuración cross-origin
- **Error Handling**: Manejo centralizado de errores
- **Proxy**: Enrutamiento a microservicios

## 📡 Endpoints

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "services": [
    {
      "name": "auth",
      "status": "healthy",
      "latency": 27
    },
    {
      "name": "user",
      "status": "healthy",
      "latency": 18
    }
  ]
}
```

### Proxy Routes

- `/auth/*` → Auth Service (3001)
- `/users/*` → User Service (3002)
- `/products/*` → Product Service (3003)
- `/orders/*` → Order Service (3004)
- `/payments/*` → Payment Service (3005)

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3000
AUTH_SERVICE_URL=http://auth:3001
USER_SERVICE_URL=http://user:3002
PRODUCT_SERVICE_URL=http://product:3003
ORDER_SERVICE_URL=http://order:3004
PAYMENT_SERVICE_URL=http://payment:3005
```

### Dependencias

- `express`: Framework web
- `http-proxy-middleware`: Proxy HTTP
- `cors`: Cross-origin resource sharing
- `helmet`: Security headers
- `morgan`: HTTP request logger
- `jsonwebtoken`: JWT validation

## 🔄 Flujo de Request

1. **Frontend** → Gateway: Request con JWT
2. **Gateway** → Valida JWT y extrae claims
3. **Gateway** → Proxy al servicio correcto
4. **Servicio** → Procesa request
5. **Servicio** → Response al Gateway
6. **Gateway** → Response al Frontend

## 📊 Monitoreo

- Logs de requests en stdout
- Health checks cada 30s
- Latencia por servicio
- Status de conectividad

## 🚀 Despliegue

```bash
docker-compose up --build gateway
```

## 🔗 Integraciones

- **Frontend**: React SPA
- **Auth Service**: Validación JWT
- **Todos los microservicios**: Proxy HTTP
