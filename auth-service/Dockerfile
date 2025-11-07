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
COPY package*.json ./

# Instalamos TODAS las dependencias (incluidas devDependencies)
# Necesarias para compilar TypeScript con tsc
# --no-audit y --no-fund reducen el tiempo de instalación
RUN npm install --no-audit --no-fund

# Copiamos el código fuente y archivos de configuración
# Se hace DESPUÉS de instalar dependencias para aprovechar la caché
COPY tsconfig.json ./
COPY app/ ./app/
COPY config/ ./config/
COPY middlewares/ ./middlewares/
COPY utils/ ./utils/

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

# Copiamos SOLO los archivos de dependencias
COPY package*.json ./

# Instalamos SOLO las dependencias de producción
# --omit=dev excluye devDependencies, reduciendo el tamaño de la imagen
# --no-audit y --no-fund aceleran la instalación
RUN npm install --omit=dev --no-audit --no-fund && \
    npm cache clean --force

# Copiamos el código compilado desde la etapa builder
# Solo traemos el JavaScript compilado, no el código TypeScript original
COPY --from=builder /app/dist ./dist

# Copiamos archivos adicionales necesarios en runtime
# El archivo .env no debe incluirse aquí (se pasa como variable de entorno)
COPY --chown=nodejs:nodejs package.json ./

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
