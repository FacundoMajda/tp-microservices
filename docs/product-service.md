# Servicio de Productos - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Productos  
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

El Servicio de Productos administra el catálogo de productos de la mini tienda online. Permite operaciones CRUD sobre productos, incluyendo gestión de stock, precios y categorías. Implementa control de acceso para proteger operaciones administrativas.

Este servicio es fundamental para el funcionamiento del comercio electrónico, proporcionando la información de productos necesaria para pedidos y navegación del catálogo.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3003
- **Dependencias Principales:** Express, Sequelize, MySQL2, Morgan, Helmet, CORS, JWT

Sigue una arquitectura de capas con controladores, servicios y repositorios para mantener la separación de responsabilidades.

## Funcionalidades

- CRUD completo de productos
- Gestión de stock y precios
- Organización por categorías
- Soft deletes
- Validación de autenticación
- Control de acceso basado en roles
- Integración con otros servicios para validación de productos en pedidos

## API Endpoints

### Gestión de Productos

- **GET** `/products` - Obtener todos los productos
- **GET** `/products/:id` - Obtener producto por ID
- **GET** `/products/category/:category` - Obtener productos por categoría
- **POST** `/products` - Crear nuevo producto (requiere admin)
- **PUT** `/products/:id` - Actualizar producto (requiere admin)
- **DELETE** `/products/:id` - Soft delete producto (requiere admin)

## Configuración

Variables de entorno:

- `PRODUCT_SERVICE_PORT`: Puerto del servicio (predeterminado: 3003)
- Configuración de base de datos vía `config/db.config.ts`
- Configuración JWT para autenticación

## Middleware

- Middleware de autenticación JWT
- Middleware de autorización por roles (admin)
- Middleware de logging
- CORS para soporte de origen cruzado
- Helmet para encabezados de seguridad
- Middleware de manejo de errores

## Modelos de Base de Datos

- **Product**: Modelo principal con campos como name, description, price, stock, category, etc.
- Soporte para soft deletes con paranoid en Sequelize

## Conclusión

El Servicio de Productos proporciona una gestión eficiente del catálogo de productos, asegurando la integridad de los datos y la seguridad de las operaciones administrativas. Su diseño permite una fácil integración con otros servicios del sistema.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
3. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
4. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
5. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
6. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
7. Fowler, M. (2014). _Patterns of Enterprise Application Architecture_. Addison-Wesley.
