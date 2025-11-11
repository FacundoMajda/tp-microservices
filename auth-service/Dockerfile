# ============================================
# Dockerfile para Auth Service (Producción)
# Servicio de autenticación y emisión de JWT
# ============================================

# ============================================
# Etapa 1: Builder - Compilación de TypeScript
# ============================================
# Usamos Node.js 20 Alpine por su tamaño reducido (~40MB vs ~340MB en la versión completa)
# Esta etapa compila TypeScript a JavaScript y prepara las dependencias
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo
# Todas las operaciones subsiguientes se ejecutarán desde /app
WORKDIR /app

# Copiamos SOLO los archivos de dependencias primero
# Esto optimiza la caché de Docker: si package.json no cambia, esta capa se reutiliza
COPY auth-service/package*.json ./auth-service/

# Copy and build shared module first
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install --no-audit --no-fund && npm run build

# Now build auth service
WORKDIR /app/auth-service

# Instalamos TODAS las dependencias con reintentos automáticos
# Configuramos npm para mayor estabilidad y agregamos reintentos
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --no-audit --no-fund --fetch-retries 5 || \
    (sleep 10 && npm install --no-audit --no-fund --fetch-retries 5)

# Copiamos el código fuente y archivos de configuración
# Se hace DESPUÉS de instalar dependencias para aprovechar la caché
COPY auth-service/tsconfig.json ./
COPY auth-service/app/ ./app/
COPY auth-service/config/ ./config/
COPY auth-service/controllers/ ./controllers/
COPY auth-service/interfaces/ ./interfaces/
COPY auth-service/middlewares/ ./middlewares/
COPY auth-service/models/ ./models/
COPY auth-service/routes/ ./routes/
COPY auth-service/services/ ./services/
COPY auth-service/utils/ ./utils/

# Compilamos TypeScript a JavaScript
# El output se genera en el directorio /dist según tsconfig.json
RUN npm run build

# ============================================
# Etapa 2: Production - Imagen final optimizada
# ============================================
# Iniciamos desde una imagen base limpia para reducir el tamaño final
FROM node:20-alpine

# Metadata de la imagen
LABEL maintainer="tu-email@ejemplo.com"
LABEL service="auth-service"
LABEL version="1.0.0"

# Instalamos dumb-init para manejar correctamente señales de proceso
# Esto asegura que Node.js reciba correctamente SIGTERM y SIGINT
RUN apk add --no-cache dumb-init

# Creamos un usuario no-root para ejecutar la aplicación
# Mejora significativa de seguridad: nunca correr como root en producción
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY auth-service/package*.json ./

# Copiar node_modules completo desde builder (incluye dependencies)
COPY --from=builder /app/auth-service/node_modules ./node_modules

# Copiar módulo shared compilado directamente (no el symlink)
RUN rm -rf ./node_modules/@tp-microservices/shared && mkdir -p ./node_modules/@tp-microservices/shared
COPY --from=builder /app/shared/dist ./node_modules/@tp-microservices/shared/dist
COPY --from=builder /app/shared/package.json ./node_modules/@tp-microservices/shared/

# Copiamos el código compilado desde la etapa builder
# Solo traemos el JavaScript compilado, no el código TypeScript original
COPY --from=builder /app/auth-service/dist ./dist

# Copiamos archivos adicionales necesarios en runtime
# El archivo .env no debe incluirse aquí (se pasa como variable de entorno)
# COPY --chown=nodejs:nodejs package.json ./  # Already copied above

# Cambiamos la propiedad de todos los archivos al usuario nodejs
# Esto asegura que el usuario tenga permisos correctos
RUN chown -R nodejs:nodejs /app

# Cambiamos al usuario no-root
# A partir de este punto, todos los comandos se ejecutan como nodejs
USER nodejs

# Exponemos el puerto 3000 (solo documentación, no abre el puerto)
# El puerto real se mapea en docker-compose.yml o con -p
EXPOSE 3000

# Variables de entorno por defecto
# Estas pueden ser sobrescritas en docker-compose.yml o con -e
ENV NODE_ENV=production \
    PORT=3000

# Usamos dumb-init como entrypoint para manejar señales correctamente
# Ejecutamos la aplicación compilada
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app/server.js"]
