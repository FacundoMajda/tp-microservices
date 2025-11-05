# Servicio de Pagos - Documentación Profesional

## Carátula

**Título:** Documentación del Servicio de Pagos  
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

El Servicio de Pagos maneja todas las transacciones de pago en la mini tienda online. Proporciona endpoints para crear, consultar y procesar pagos asociados a pedidos. Implementa validaciones de seguridad y estados de pago para asegurar transacciones confiables.

Este servicio es crítico en el flujo de compra, integrándose con el servicio de pedidos para completar las transacciones comerciales.

## Arquitectura

- **Framework:** Express.js con TypeScript
- **Base de Datos:** MySQL con ORM Sequelize
- **Puerto:** 3005
- **Dependencias Principales:** Express, Sequelize, MySQL2, Morgan, Helmet, CORS, JWT

Utiliza arquitectura de capas con controladores, servicios y repositorios para una separación clara de responsabilidades.

## Funcionalidades

- CRUD de pagos
- Procesamiento de pagos
- Consulta de pagos por pedido
- Filtrado por estado de pago
- Soft deletes
- Validación de autenticación y autorización
- Integración con servicio de pedidos

## API Endpoints

### Gestión de Pagos

- **GET** `/payments` - Obtener todos los pagos (requiere admin)
- **GET** `/payments/:id` - Obtener pago por ID (requiere admin)
- **GET** `/payments/order/:orderId` - Obtener pagos por ID de pedido (requiere admin)
- **GET** `/payments/status/:status` - Obtener pagos por estado (requiere admin)
- **POST** `/payments` - Crear nuevo pago
- **PUT** `/payments/:id` - Actualizar pago (requiere admin)
- **DELETE** `/payments/:id` - Soft delete pago (requiere admin)
- **POST** `/payments/:id/process` - Procesar pago (requiere admin)

## Configuración

Variables de entorno:

- `PAYMENT_SERVICE_PORT`: Puerto del servicio (predeterminado: 3005)
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

- **Payment**: Modelo principal con campos como orderId, amount, status, method, processedAt, etc.
- Soporte para soft deletes con paranoid en Sequelize

## Conclusión

El Servicio de Pagos asegura transacciones seguras y rastreables en la plataforma de comercio electrónico, proporcionando una base confiable para el procesamiento de pagos y la integridad financiera del sistema.

## Referencias

1. Express.js Documentation. (2023). _Express - Node.js web application framework_. Recuperado de <https://expressjs.com/>
2. Sequelize. (2023). _Sequelize ORM_. Recuperado de <https://sequelize.org/>
3. MySQL. (2023). _MySQL Documentation_. Recuperado de <https://dev.mysql.com/doc/>
4. JWT.io. (2023). _JSON Web Tokens_. Recuperado de <https://jwt.io/>
5. Newman, S. (2015). _Building Microservices_. O'Reilly Media.
6. Richardson, C. (2018). _Microservices Patterns_. Manning Publications.
7. Fowler, M. (2014). _Patterns of Enterprise Application Architecture_. Addison-Wesley.
