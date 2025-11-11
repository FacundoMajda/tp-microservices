#!/bin/bash

echo "Starting reset process..."
services=("auth-service" "gateway-service" "user-service" "product-service" "order-service" "payment-service" "client")
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
for service in "${services[@]}"; do
    echo "Installing dependencies in $service..."
    if [ -d "$service" ]; then
        cd "$service"
        npm install
        cd ..
        echo "Dependencies installed in $service successfully."
    else
        echo "Directory $service not found."
    fi
done
echo "Reset process completed."
