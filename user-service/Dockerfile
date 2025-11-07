# ============================================
# Dockerfile para User Service (Producción)
# Servicio de gestión de usuarios
# ============================================

# ============================================
# Etapa 1: Builder - Compilación de TypeScript
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Optimización de caché: copiar package.json primero
COPY package*.json ./

# Instalar todas las dependencias para compilar
RUN npm install --no-audit --no-fund

# Copiar código fuente y configuración
COPY tsconfig.json ./
COPY app/ ./app/
COPY config/ ./config/
COPY controllers/ ./controllers/
COPY interfaces/ ./interfaces/
COPY middlewares/ ./middlewares/
COPY models/ ./models/
COPY repository/ ./repository/
COPY routes/ ./routes/
COPY services/ ./services/
COPY utils/ ./utils/

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
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev --no-audit --no-fund && \
    npm cache clean --force

# Copiar código compilado desde builder
COPY --from=builder /app/dist ./dist

# Copiar package.json con permisos correctos
COPY --chown=nodejs:nodejs package.json ./

# Cambiar propiedad de archivos
RUN chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
