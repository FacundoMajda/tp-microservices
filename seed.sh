#!/bin/bash

echo "🚀 Starting all microservices with seeding..."

echo "Starting auth-service..."
cd auth-service && npm run start:dev & cd ..
AUTH_PID=$!

echo "Starting user-service..."
cd user-service && npm run start:dev & cd ..
USER_PID=$!

echo "Starting product-service..."
cd product-service && npm run start:dev & cd ..
PRODUCT_PID=$!

echo "Starting order-service..."
cd order-service && npm run start:dev & cd ..
ORDER_PID=$!

echo "Starting payment-service..."
cd payment-service && npm run start:dev & cd ..
PAYMENT_PID=$!

echo "Starting gateway-service..."
cd gateway-service && npm run start:dev & cd ..
GATEWAY_PID=$!

echo "Starting client..."
cd client && npm run dev & cd ..
CLIENT_PID=$!

echo "🎯 All services started with seeding enabled!"
echo "📊 Check each service logs for seeding confirmation"
echo ""
echo "Service URLs:"
echo "• Gateway: http://localhost:3000"
echo "• Auth: http://localhost:3001"
echo "• User: http://localhost:3002"
echo "• Product: http://localhost:3003"
echo "• Order: http://localhost:3004"
echo "• Payment: http://localhost:3005"
echo "• Client: http://localhost:80"
echo ""
echo "Press Ctrl+C to stop all services"

wait $AUTH_PID $USER_PID $PRODUCT_PID $ORDER_PID $PAYMENT_PID $GATEWAY_PID $CLIENT_PID