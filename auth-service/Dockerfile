FROM node:20-alpine AS builder

WORKDIR /app

COPY auth-service/package*.json ./auth-service/

COPY shared /app/shared
WORKDIR /app/shared
RUN npm install --no-audit --no-fund && npm run build

WORKDIR /app/auth-service

RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --no-audit --no-fund --fetch-retries 5 || \
    (sleep 10 && npm install --no-audit --no-fund --fetch-retries 5)

COPY auth-service/tsconfig.json ./
COPY auth-service/app/ ./app/
COPY auth-service/config/ ./config/
COPY auth-service/controllers/ ./controllers/
COPY auth-service/interfaces/ ./interfaces/
COPY auth-service/middlewares/ ./middlewares/
COPY auth-service/models/ ./models/
COPY auth-service/routes/ ./routes/
COPY auth-service/services/ ./services/
COPY auth-service/seeders/ ./seeders/
COPY auth-service/utils/ ./utils/

RUN npm run build

FROM node:20-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="auth-service"
LABEL version="1.0.0"

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY auth-service/package*.json ./

COPY --from=builder /app/auth-service/node_modules ./node_modules

RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

COPY --from=builder /app/auth-service/dist ./dist

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production \
    PORT=3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
