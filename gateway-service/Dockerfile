 # ============================================
# Dockerfile para Gateway Service (Producción)
# API Gateway con proxy y enrutamiento
# ============================================

# ============================================
# Etapa 1: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --no-audit --no-fund --fetch-retries 5 || \
    (sleep 10 && npm install --no-audit --no-fund --fetch-retries 5)

COPY tsconfig.json ./
COPY app/ ./app/
COPY middlewares/ ./middlewares/
COPY utils/ ./utils/

RUN npm run build

# ============================================
# Etapa 2: Production
# ============================================
FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="gateway-service"
LABEL version="1.0.0"

# Instalar curl para healthchecks
RUN apk add --no-cache dumb-init curl

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

# El gateway expone el puerto principal de la API
EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
