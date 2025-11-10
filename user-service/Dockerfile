# ============================================
# Dockerfile para User Service (Producción)
# Servicio de gestión de usuarios
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

# Now build user service
WORKDIR /app/user-service

# Optimización de caché: copiar package.json primero
COPY user-service/package*.json ./

# Link shared module
RUN npm install --no-audit --no-fund

# Copiar código fuente y configuración
COPY user-service/tsconfig.json ./
COPY user-service/app/ ./app/
COPY user-service/config/ ./config/
COPY user-service/controllers/ ./controllers/
COPY user-service/interfaces/ ./interfaces/
COPY user-service/middlewares/ ./middlewares/
COPY user-service/models/ ./models/
COPY user-service/repository/ ./repository/
COPY user-service/routes/ ./routes/
COPY user-service/services/ ./services/
COPY user-service/utils/ ./utils/

# Compilar TypeScript a JavaScript
RUN npm run build

# ============================================
# Etapa 2: Production - Imagen final
# ============================================
FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="user-service"
LABEL version="1.0.0"

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copiar archivos de dependencias
COPY user-service/package*.json ./

# Copiar node_modules completo desde builder (incluye dependencies)
COPY --from=builder /app/user-service/node_modules ./node_modules

# Copiar módulo shared compilado directamente (no el symlink)
RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

# Copiar código compilado desde builder
COPY --from=builder /app/user-service/dist ./dist

# Copiar package.json con permisos correctos
COPY --chown=nodejs:nodejs user-service/package.json ./

# Cambiar propiedad de archivos
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
