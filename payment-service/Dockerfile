# ============================================
# Dockerfile para Payment Service (Producción)
# Servicio de gestión de pagos
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

# Now build payment service
WORKDIR /app/payment-service

COPY payment-service/package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --no-audit --no-fund --fetch-retries 5 || \
    (sleep 10 && npm install --no-audit --no-fund --fetch-retries 5)

COPY payment-service/tsconfig.json ./
COPY payment-service/app/ ./app/
COPY payment-service/config/ ./config/
COPY payment-service/controllers/ ./controllers/
COPY payment-service/interfaces/ ./interfaces/
COPY payment-service/middlewares/ ./middlewares/
COPY payment-service/models/ ./models/
COPY payment-service/repository/ ./repository/
COPY payment-service/routes/ ./routes/
COPY payment-service/services/ ./services/
COPY payment-service/subscribers/ ./subscribers/
COPY payment-service/utils/ ./utils/

RUN npm run build

# ============================================
# Etapa 2: Production
# ============================================
FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="payment-service"
LABEL version="1.0.0"

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY payment-service/package*.json ./

# Copiar node_modules completo desde builder (incluye dependencies)
COPY --from=builder /app/payment-service/node_modules ./node_modules

# Copiar módulo shared compilado directamente (no el symlink)
RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

COPY --from=builder /app/payment-service/dist ./dist
# COPY --chown=nodejs:nodejs package.json ./  # Already copied above

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
