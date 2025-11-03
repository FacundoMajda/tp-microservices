#!/bin/bash

# Script para resetear node_modules y reinstalar dependencias en todos los servicios
# Servicios: auth-service, gateway-service, user-service

echo "Starting reset process..."

# Lista de servicios
services=("auth-service" "gateway-service" "user-service" "product-service" "order-service" "payment-service")

# Paso 1: Borrar node_modules y archivos de lock en cada servicio
for service in "${services[@]}"; do
    echo "Cleaning $service..."
    if [ -d "$service" ]; then
        cd "$service"
        rm -rf node_modules package-lock.json yarn.lock
        cd ..
        echo "Cleaned $service successfully."
    else
        echo "Directory $service not found."
    fi
done

# Paso 2: Instalar dependencias en cada servicio (incluyendo Sequelize)
for service in "${services[@]}"; do
    echo "Installing dependencies in $service..."
    if [ -d "$service" ]; then
        cd "$service"
        npm install --save-dev @types/node
        npm install
        cd ..
        echo "Dependencies installed in $service successfully."
    else
        echo "Directory $service not found."
    fi
done

echo "Reset process completed."
