# ============================================
# Dockerfile para Product Service (Producción)
# Servicio de gestión de productos
# ============================================

# ============================================
# Etapa 1: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy and build shared module first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install --no-audit --no-fund && npm run build

# Now build product service
WORKDIR /app/product-service

COPY product-service/package*.json ./
RUN npm install --no-audit --no-fund

COPY product-service/tsconfig.json ./
COPY product-service/app/ ./app/
COPY product-service/config/ ./config/
COPY product-service/controllers/ ./controllers/
COPY product-service/interfaces/ ./interfaces/
COPY product-service/middlewares/ ./middlewares/
COPY product-service/models/ ./models/
COPY product-service/repository/ ./repository/
COPY product-service/routes/ ./routes/
COPY product-service/services/ ./services/
COPY product-service/utils/ ./utils/

RUN npm run build

# ============================================
# Etapa 2: Production
# ============================================
FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="product-service"
LABEL version="1.0.0"

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY product-service/package*.json ./

# Copiar node_modules completo desde builder
COPY --from=builder /app/product-service/node_modules ./node_modules

# Copiar módulo shared compilado directamente (no el symlink)
RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

COPY --from=builder /app/product-service/dist ./dist
COPY --chown=nodejs:nodejs product-service/package.json ./

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
