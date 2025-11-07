# ============================================
# Dockerfile para Payment Service (Producción)
# Servicio de gestión de pagos
# ============================================

# ============================================
# Etapa 1: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

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

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund && \
    npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --chown=nodejs:nodejs package.json ./

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
