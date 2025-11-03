# 🚀 Microservicios Node.js + TypeScript + Express + MySQL

## ✨ Características

- **Arquitectura de Microservicios**: Diseñada con un gateway/proxy para una comunicación fluida entre servicios.
- **Poder de Express.js**: Aprovecha la flexibilidad y velocidad de Express.js para manejar solicitudes HTTP.
- **Brillo de TypeScript**: Disfruta los beneficios de TypeScript para seguridad de tipos y mejor experiencia de desarrollo.
- **ORM Sequelize**: Simplifica las interacciones con la base de datos usando Sequelize para MySQL.
- **Dockerización**: Configuración de Docker para despliegue y escalado sencillo.
- **Servicios de ejemplo**: Explora los servicios de ejemplo con una estructura de carpetas clara para entender y extender.

## �️ Requisitos previos

- **Node.js**: Asegúrate de tener Node.js instalado en tu máquina.
- **Docker**: Instala Docker en tu máquina para la contenerización.

1. **Configurar variables de entorno**:

   - Crea un archivo `.env` en la raíz basado en el archivo `.env-example` provisto.
   - Actualiza las variables de entorno con la configuración de tu base de datos MySQL.

2. **Ejecutar los servicios**:

   ```bash
   docker compose up
   ```

3. **Acceder a los servicios**:

   - Visita `http://localhost:3000` (o el puerto configurado) para interactuar con los servicios.

## 📂 Estructura del proyecto

```txt
nodejs-express-microservice/
├── 📁 gateway-service/        # Servicio proxy / gateway
│   ├── 📁 app/                # Lógica del proxy (controladores)
│   |   └── 📄 server.ts       # Punto de entrada del servicio proxy
│   ├── 📁 config/             # Archivos de configuración
│   |   └── 📄 db.config.ts    # Configuración de la base de datos
│   |   └── 📄 index.ts        # Exports por defecto
├── 📁 auth-service/           # Servicio de autenticación
│   ├── 📁 app/                # Lógica de auth (controladores, rutas, etc.)
│   |   └── 📄 server.ts       # Punto de entrada del servicio de auth
│   ├── 📁 config/             # Archivos de configuración
│   |   └── 📄 db.config.ts    # Configuración de la base de datos
│   |   └── 📄 index.ts        # Exports por defecto
├── 📁 user-service/           # Servicio de usuarios
│   ├── 📁 app/                # Lógica de usuario (controladores, rutas, etc.)
│   |   └── 📄 server.ts       # Punto de entrada del servicio de usuarios
│   ├── 📁 config/             # Archivos de configuración
│   |   └── 📄 db.config.ts    # Configuración de la base de datos
│   |   └── 📄 index.ts        # Exports por defecto
│   └── ...
|── 📄 init.sh                 # Un script shell para actualizar/instalar dependencias en todos los servicios
|── 📄 schema.sql              # Archivo de esquema MySQL para el volumen de Docker
├── 📄 .dockerignore           # Archivos a ignorar en la build de Docker
├── 📄 docker-compose.yml      # Configuración de Docker
├── 📄 .env.example            # Ejemplo de variables de entorno
└── 📄 README.md               # Estás aquí
```
