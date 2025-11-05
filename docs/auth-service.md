# Servicio de Autenticación - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Autenticación  
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

El Servicio de Autenticación es un microservicio encargado de gestionar la autenticación y autorización de usuarios dentro de la aplicación de mini tienda online. Proporciona mecanismos de autenticación basados en JWT para asegurar el acceso a recursos protegidos en todo el sistema.

Este servicio forma parte de una arquitectura de microservicios que permite la escalabilidad y el mantenimiento independiente de cada componente. Se comunica con otros servicios a través del API Gateway y utiliza una base de datos MySQL compartida.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3001
- **Dependencias Principales:** Express, Sequelize, MySQL2, Morgan, Helmet, CORS

La arquitectura sigue los principios de microservicios, permitiendo el despliegue independiente y la comunicación vía HTTP/REST a través del Gateway.

## Funcionalidades

- Generación y validación de tokens JWT
- Gestión de roles de usuario
- Endpoints de autenticación seguros
- Registro y manejo de errores
- Endpoint de verificación de salud

## API Endpoints

### Verificación de Salud

- **GET** `/health` - Estado de salud del servicio

### Endpoints de Autenticación

(Nota: Las rutas específicas de autenticación se manejan a través del proxy del API Gateway en `/auth`)

## Configuración

Variables de entorno:

- `AUTH_SERVICE_PORT`: Puerto del servicio (predeterminado: 3001)
- Configuración de base de datos vía `config/db.config.ts`

## Middleware

- Middleware de logging para seguimiento de solicitudes
- Soporte CORS
- Helmet para encabezados de seguridad
- Middleware de manejo de errores

## Modelos de Base de Datos

El servicio se conecta a una base de datos MySQL compartida utilizando Sequelize para datos de autenticación de usuarios.

## Conclusión

El Servicio de Autenticación proporciona una base sólida para la seguridad de la aplicación de microservicios, implementando prácticas estándar de autenticación JWT. Su integración con el API Gateway permite una gestión centralizada de la autenticación, facilitando la escalabilidad y el mantenimiento del sistema.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
3. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
4. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
5. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
6. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
