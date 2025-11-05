# Servicio de Usuarios - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Usuarios  
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

El Servicio de Usuarios gestiona toda la información y operaciones relacionadas con los usuarios de la mini tienda online. Proporciona funcionalidades de registro, consulta y actualización de perfiles de usuario, incluyendo preferencias personalizadas. Implementa control de acceso granular basado en roles y propiedad de recursos.

Este servicio es esencial para la autenticación y personalización de la experiencia del usuario en la plataforma.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3002
- **Dependencias Principales:** Express, Sequelize, MySQL2, Morgan, Helmet, CORS, JWT

Utiliza arquitectura de capas con controladores, servicios y repositorios para una clara separación de responsabilidades.

## Funcionalidades

- CRUD completo de usuarios
- Gestión de preferencias de usuario
- Registro de nuevos usuarios
- Control de acceso basado en roles (usuario/admin)
- Validación de propiedad de recursos
- Soft deletes
- Integración con servicio de autenticación

## API Endpoints

### Gestión de Usuarios

- **GET** `/users` - Obtener todos los usuarios (requiere admin)
- **GET** `/users/:id` - Obtener usuario por ID (propietario o admin)
- **POST** `/users` - Crear nuevo usuario
- **PUT** `/users/:id` - Actualizar usuario (propietario o admin)
- **DELETE** `/users/:id` - Soft delete usuario (propietario o admin)
- **PUT** `/users/:id/preferences` - Actualizar preferencias (propietario o admin)

## Configuración

Variables de entorno:

- `USER_SERVICE_PORT`: Puerto del servicio (predeterminado: 3002)
- Configuración de base de datos vía `config/db.config.ts`
- Configuración JWT para autenticación

## Middleware

- Middleware de autenticación JWT
- Middleware de autorización por roles (admin)
- Middleware de verificación de propiedad (ownerOrAdmin)
- Middleware de logging
- CORS para soporte de origen cruzado
- Helmet para encabezados de seguridad
- Middleware de manejo de errores

## Modelos de Base de Datos

- **User**: Modelo principal con campos como email, password, role, preferences, etc.
- Soporte para soft deletes con paranoid en Sequelize

## Conclusión

El Servicio de Usuarios proporciona una base sólida para la gestión de usuarios en la aplicación, asegurando la seguridad, privacidad y personalización de la experiencia. Su integración con otros servicios permite un ecosistema coherente y escalable.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
3. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
4. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
5. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
6. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
7. Fowler, M. (2014). _Patterns of Enterprise Application Architecture_. Addison-Wesley.
