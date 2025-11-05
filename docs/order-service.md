# Servicio de Pedidos - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Pedidos  
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

El Servicio de Pedidos gestiona todas las operaciones relacionadas con los pedidos de la mini tienda online. Permite a los usuarios crear, consultar y gestionar sus pedidos, incluyendo los items asociados. Implementa control de acceso basado en roles y soft deletes para mantener la integridad de los datos.

Este servicio interactúa con otros microservicios para validar usuarios y productos, formando parte integral del flujo de compra en la aplicación.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3004
- **Dependencias Principales:** Express, Sequelize, MySQL2, Morgan, Helmet, CORS, JWT

La arquitectura sigue el patrón de capas con controladores, servicios y repositorios para separación de responsabilidades.

## Funcionalidades

- CRUD completo de pedidos
- Gestión de items en pedidos
- Consulta de pedidos por usuario
- Filtrado por estado de pedido
- Soft deletes
- Validación de autenticación y autorización
- Integración con servicios de usuarios y productos

## API Endpoints

### Gestión de Pedidos

- **GET** `/orders` - Obtener todos los pedidos (requiere admin)
- **GET** `/orders/:id` - Obtener pedido por ID (propietario o admin)
- **GET** `/orders/user/me` - Obtener pedidos del usuario actual
- **GET** `/orders/status/:status` - Obtener pedidos por estado (requiere admin)
- **POST** `/orders` - Crear nuevo pedido
- **PUT** `/orders/:id` - Actualizar pedido (requiere admin)
- **DELETE** `/orders/:id` - Soft delete pedido (requiere admin)

## Configuración

Variables de entorno:

- `ORDER_SERVICE_PORT`: Puerto del servicio (predeterminado: 3004)
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

- **Order**: Modelo principal con campos como userId, status, total, createdAt, etc.
- **OrderItem**: Modelo para items del pedido con productId, quantity, price
- Soporte para soft deletes con paranoid en Sequelize

## Conclusión

El Servicio de Pedidos proporciona una gestión robusta de los pedidos en la aplicación de comercio electrónico, asegurando la integridad de las transacciones y la seguridad de los datos. Su integración con otros servicios permite un flujo de compra completo y escalable.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
3. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
4. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
5. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
6. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
7. Fowler, M. (2014). _Patterns of Enterprise Application Architecture_. Addison-Wesley.
