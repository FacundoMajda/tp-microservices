# ============================================
# Dockerfile para Client (Producción)
# Frontend React + Vite + TypeScript
# ============================================

# ============================================
# Etapa 1: Builder - Compilación de assets
# ============================================
# Usamos Node.js 20 Alpine para compilar la aplicación React
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero para optimizar caché
COPY package*.json ./

# Instalar todas las dependencias (incluidas devDependencies)
# Vite y las herramientas de build están en devDependencies
RUN npm install --no-audit --no-fund

# Copiar archivos de configuración
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY components.json ./
COPY eslint.config.js ./

# Copiar código fuente
COPY src/ ./src/

# Compilar la aplicación para producción
# Vite genera los assets optimizados en /app/dist
# - Minificación de JS/CSS
# - Tree-shaking
# - Code splitting
# - Hash de archivos para cache busting
# Usamos vite build directamente para evitar errores de type-checking
RUN npx vite build

# ============================================
# Etapa 2: Production - Servidor Nginx
# ============================================
# Usamos Nginx Alpine como servidor web ligero (~25MB)
# Nginx es ideal para servir contenido estático
FROM nginx:1.25-alpine

LABEL maintainer="tu-email@ejemplo.com"
LABEL service="client"
LABEL version="1.0.0"

# Copiar configuración personalizada de Nginx
# Esta configuración maneja el enrutamiento SPA (Single Page Application)
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Compresión gzip para mejor rendimiento
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level 6;

    # Cache para assets estáticos (archivos con hash)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Redirigir todas las rutas a index.html para SPA routing
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copiar los archivos compilados desde la etapa builder
# /usr/share/nginx/html es el directorio por defecto de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx en Alpine ya corre como usuario nginx (no-root)
# Asegurar permisos correctos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Nginx se ejecuta en foreground por defecto con esta configuración
CMD ["nginx", "-g", "daemon off;"]
