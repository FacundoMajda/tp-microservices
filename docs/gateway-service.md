# Servicio de Gateway - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Gateway  
**Proyecto:** Mini Tienda Online - Arquitectura de Microservicios  
**Autor:** Equipo de Desarrollo  
**Fecha:** 5 de noviembre de 2025  
**Versión:** 1.0

## Índice

1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Funcionalidades](#funcionalidades)
4. [API Endpoints](#api-endpoints)
5. [Configuración](#configuración)
6. [Middleware](#middleware)
7. [Modelos de Base de Datos](#modelos-de-base-de-datos)
8. [Conclusión](#conclusión)
9. [Referencias](#referencias)

## Introducción

El Servicio de Gateway actúa como punto de entrada único para todas las solicitudes del cliente en la arquitectura de microservicios de la mini tienda online. Implementa un API Gateway que enruta las solicitudes a los servicios apropiados, maneja la autenticación JWT y proporciona logging centralizado.

Este servicio es fundamental en la arquitectura de microservicios, ya que permite la comunicación fluida entre el frontend y los microservicios backend, además de proporcionar una capa de seguridad y monitoreo unificada.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3000
- **Dependencias Principales:** Express, http-proxy-middleware, Sequelize, MySQL2, Morgan, Helmet, CORS

La arquitectura utiliza proxy middleware para redirigir solicitudes a servicios específicos basados en rutas.

## Funcionalidades

- Enrutamiento de solicitudes a microservicios
- Validación de tokens JWT
- Logging centralizado
- Verificación de salud de todos los servicios
- Soporte CORS
- Manejo de errores unificado

## API Endpoints

### Verificación de Salud

- **GET** `/health` - Estado de salud de todos los servicios

### Rutas Proxiadas

- `/auth/*` - Proxy al servicio de autenticación
- `/users/*` - Proxy al servicio de usuarios
- `/products/*` - Proxy al servicio de productos
- `/orders/*` - Proxy al servicio de pedidos
- `/payments/*` - Proxy al servicio de pagos

## Configuración

Variables de entorno:

- `GATEWAY_SERVICE_PORT`: Puerto del servicio (predeterminado: 3000)
- URLs y puertos de servicios individuales
- Configuración de base de datos vía `config/db.config.ts`

## Middleware

- Middleware de proxy para enrutamiento
- Middleware de logging para seguimiento
- CORS para soporte de origen cruzado
- Helmet para encabezados de seguridad
- Middleware de manejo de errores

## Modelos de Base de Datos

El servicio se conecta a la base de datos compartida, aunque principalmente actúa como proxy y no maneja modelos propios.

## Conclusión

El Servicio de Gateway es el componente central de la arquitectura de microservicios, proporcionando un punto de entrada unificado y facilitando la comunicación entre servicios. Su implementación permite una mejor escalabilidad, seguridad y mantenibilidad del sistema completo.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. http-proxy-middleware. (2023). _Node.js proxy middleware_. Recuperado de <https://www.npmjs.com/package/http-proxy-middleware>
3. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
4. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
5. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
6. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
7. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
