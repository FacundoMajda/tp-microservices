# ============================================
# Dockerfile para Order Service (Producción)
# Servicio de gestión de pedidos
# ============================================

# ============================================
# Etapa 1: Builder - Compilación de TypeScript
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy and build shared module first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install --no-audit --no-fund && npm run build

# Now build order service
WORKDIR /app/order-service

# Optimización de caché: copiar package.json primero
COPY order-service/package*.json ./

# Link shared module
RUN npm install --no-audit --no-fund

# Copiar código fuente y configuración
COPY order-service/tsconfig.json ./
COPY order-service/app/ ./app/
COPY order-service/config/ ./config/
COPY order-service/controllers/ ./controllers/
COPY order-service/interfaces/ ./interfaces/
COPY order-service/middlewares/ ./middlewares/
COPY order-service/models/ ./models/
COPY order-service/repository/ ./repository/
COPY order-service/routes/ ./routes/
COPY order-service/services/ ./services/
COPY order-service/subscribers/ ./subscribers/
COPY order-service/utils/ ./utils/

# Compilar TypeScript a JavaScript
RUN npm run build

# ============================================
# Etapa 2: Production - Imagen final
# ============================================
FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="order-service"
LABEL version="1.0.0"

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copiar archivos de dependencias
COPY order-service/package*.json ./

# Copiar node_modules completo desde builder (incluye dependencies)
COPY --from=builder /app/order-service/node_modules ./node_modules

# Copiar módulo shared compilado directamente (no el symlink)
RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

# Copiar código compilado desde builder
COPY --from=builder /app/order-service/dist ./dist

# Copiar package.json con permisos correctos
COPY --chown=nodejs:nodejs order-service/package.json ./

# Cambiar propiedad de archivos
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
