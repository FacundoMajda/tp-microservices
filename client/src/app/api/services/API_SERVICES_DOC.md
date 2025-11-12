# Auth Service

## Endpoints

- POST /register
  - Input: RegisterData
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "role": "user"
    }
    ```
  - Output: AuthResponse
    ```json
    {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "role": "user"
      },
      "token": "jwt_token_here"
    }
    ```

- POST /login
  - Input: LoginData
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Output: AuthResponse
    ```json
    {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "role": "user"
      },
      "token": "jwt_token_here"
    }
    ```

- POST /verify
  - Input: Authorization header with Bearer token
  - Output: Decoded JWT payload
    ```json
    {
      "userId": 1,
      "email": "user@example.com",
      "role": "user",
      "iat": 1638360000,
      "exp": 1638446400
    }
    ```

## Interfaces

```typescript
interface RegisterData {
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
    role: string;
  };
  token: string;
}

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

type UserCreateAttributes = PartialBy<
  UserAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
```

# User Service

## Endpoints

- GET /users (admin)
  - Input: None
  - Output: Array of UserAttributes (without password)
    ```json
    [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "role": "user",
        "primaryPhone": "123456789",
        "preferences": {},
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /users/:id
  - Input: id (path parameter)
  - Output: UserAttributes (without password)
    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user",
      "primaryPhone": "123456789",
      "preferences": {},
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- POST /users
  - Input: UserCreateAttributes
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "user",
      "primaryPhone": "123456789",
      "preferences": {}
    }
    ```
  - Output: UserAttributes (without password)
    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user",
      "primaryPhone": "123456789",
      "preferences": {},
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- PUT /users/:id
  - Input: Partial<UserAttributes> (excluding password, id, timestamps)
    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "role": "user",
      "primaryPhone": "987654321",
      "preferences": {}
    }
    ```
  - Output: UserAttributes (without password)
    ```json
    {
      "id": 1,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "role": "user",
      "primaryPhone": "987654321",
      "preferences": {},
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- DELETE /users/:id
  - Input: id (path parameter)
  - Output: Success message
    ```json
    {
      "success": true,
      "message": "Usuario eliminado exitosamente"
    }
    ```

- PUT /users/:id/preferences
  - Input: { preferences: Record<string, any> }
    ```json
    {
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
    ```
  - Output: { preferences: Record<string, any> }
    ```json
    {
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
    ```

## Interfaces

```typescript
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  primaryPhone: string | null;
  preferences: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

type UserCreateAttributes = PartialBy<
  UserAttributes,
  | "id"
  | "primaryPhone"
  | "preferences"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;
```

# Product Service

## Endpoints

- GET /products
  - Input: None
  - Output: Array of ProductAttributes
    ```json
    [
      {
        "id": 1,
        "name": "Product 1",
        "description": "Description 1",
        "price": 100,
        "stock": 10,
        "category": "Category 1",
        "userId": 1,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /products/:id
  - Input: id (path parameter, string)
  - Output: ProductAttributes
    ```json
    {
      "id": 1,
      "name": "Product 1",
      "description": "Description 1",
      "price": 100,
      "stock": 10,
      "category": "Category 1",
      "userId": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- GET /products/category/:category
  - Input: category (path parameter)
  - Output: Array of ProductAttributes
    ```json
    [
      {
        "id": 1,
        "name": "Product 1",
        "description": "Description 1",
        "price": 100,
        "stock": 10,
        "category": "Category 1",
        "userId": 1,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- POST /products (admin)
  - Input: { name: string; description: string; price: number; stock: number; category: string; }
    ```json
    {
      "name": "New Product",
      "description": "New Description",
      "price": 150,
      "stock": 20,
      "category": "New Category"
    }
    ```
  - Output: ProductAttributes
    ```json
    {
      "id": 2,
      "name": "New Product",
      "description": "New Description",
      "price": 150,
      "stock": 20,
      "category": "New Category",
      "userId": 1,
      "createdAt": "2023-01-02T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- PUT /products/:id (admin)
  - Input: { name?: string; description?: string; price?: number; stock?: number; category?: string; }
    ```json
    {
      "name": "Updated Product",
      "price": 200
    }
    ```
  - Output: ProductAttributes
    ```json
    {
      "id": 1,
      "name": "Updated Product",
      "description": "Description 1",
      "price": 200,
      "stock": 10,
      "category": "Category 1",
      "userId": 1,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-03T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- DELETE /products/:id (admin)
  - Input: id (path parameter, string)
  - Output: Success message
    ```json
    {
      "success": true,
      "message": "Producto eliminado exitosamente"
    }
    ```

## Interfaces

```typescript
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

type ProductCreateAttributes = PartialBy<
  ProductAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
```

# Order Service

## Endpoints

- GET /orders (admin)
  - Input: None
  - Output: Array of OrderAttributes
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "status": "pending",
        "total": 300,
        "items": [
          {
            "productId": "prod1",
            "quantity": 2,
            "price": 150
          }
        ],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /orders/:id
  - Input: id (path parameter)
  - Output: OrderAttributes
    ```json
    {
      "id": 1,
      "userId": 1,
      "status": "pending",
      "total": 300,
      "items": [
        {
          "productId": "prod1",
          "quantity": 2,
          "price": 150
        }
      ],
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- GET /orders/user/me
  - Input: None (user from auth)
  - Output: Array of OrderAttributes
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "status": "pending",
        "total": 300,
        "items": [
          {
            "productId": "prod1",
            "quantity": 2,
            "price": 150
          }
        ],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /orders/status/:status (admin)
  - Input: status (path parameter)
  - Output: Array of OrderAttributes
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "status": "pending",
        "total": 300,
        "items": [
          {
            "productId": "prod1",
            "quantity": 2,
            "price": 150
          }
        ],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- POST /orders
  - Input: { items: Array<{ productId: string; quantity: number; price: number; }> }
    ```json
    {
      "items": [
        {
          "productId": "prod1",
          "quantity": 2,
          "price": 150
        }
      ]
    }
    ```
  - Output: OrderAttributes
    ```json
    {
      "id": 2,
      "userId": 1,
      "status": "pending",
      "total": 300,
      "items": [
        {
          "productId": "prod1",
          "quantity": 2,
          "price": 150
        }
      ],
      "createdAt": "2023-01-02T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- PUT /orders/:id (admin)
  - Input: { status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' }
    ```json
    {
      "status": "confirmed"
    }
    ```
  - Output: OrderAttributes
    ```json
    {
      "id": 1,
      "userId": 1,
      "status": "confirmed",
      "total": 300,
      "items": [
        {
          "productId": "prod1",
          "quantity": 2,
          "price": 150
        }
      ],
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-03T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- DELETE /orders/:id (admin)
  - Input: id (path parameter)
  - Output: Success message
    ```json
    {
      "success": true,
      "message": "Pedido eliminado exitosamente"
    }
    ```

## Interfaces

```typescript
interface OrderAttributes {
  id: number;
  userId: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

type OrderCreateAttributes = Omit<
  OrderAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
```

# Payment Service

## Endpoints

- GET /payments (admin)
  - Input: None
  - Output: Array of PaymentAttributes
    ```json
    [
      {
        "id": 1,
        "orderId": 1,
        "amount": 300,
        "status": "pending",
        "method": "card",
        "transactionId": "txn123",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /payments/:id (admin)
  - Input: id (path parameter)
  - Output: PaymentAttributes
    ```json
    {
      "id": 1,
      "orderId": 1,
      "amount": 300,
      "status": "pending",
      "method": "card",
      "transactionId": "txn123",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- GET /payments/order/:orderId (admin)
  - Input: orderId (path parameter)
  - Output: Array of PaymentAttributes
    ```json
    [
      {
        "id": 1,
        "orderId": 1,
        "amount": 300,
        "status": "pending",
        "method": "card",
        "transactionId": "txn123",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- GET /payments/status/:status (admin)
  - Input: status (path parameter)
  - Output: Array of PaymentAttributes
    ```json
    [
      {
        "id": 1,
        "orderId": 1,
        "amount": 300,
        "status": "pending",
        "method": "card",
        "transactionId": "txn123",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "deletedAt": null
      }
    ]
    ```

- POST /payments
  - Input: { orderId: number; amount: number; method: 'card' | 'paypal' | 'bank_transfer'; transactionId?: string; }
    ```json
    {
      "orderId": 1,
      "amount": 300,
      "method": "card",
      "transactionId": "txn123"
    }
    ```
  - Output: PaymentAttributes
    ```json
    {
      "id": 2,
      "orderId": 1,
      "amount": 300,
      "status": "pending",
      "method": "card",
      "transactionId": "txn123",
      "createdAt": "2023-01-02T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- PUT /payments/:id (admin)
  - Input: { status?: 'pending' | 'completed' | 'failed' | 'refunded'; transactionId?: string; }
    ```json
    {
      "status": "completed",
      "transactionId": "txn123_updated"
    }
    ```
  - Output: PaymentAttributes
    ```json
    {
      "id": 1,
      "orderId": 1,
      "amount": 300,
      "status": "completed",
      "method": "card",
      "transactionId": "txn123_updated",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-03T00:00:00.000Z",
      "deletedAt": null
    }
    ```

- DELETE /payments/:id (admin)
  - Input: id (path parameter)
  - Output: Success message
    ```json
    {
      "success": true,
      "message": "Pago eliminado exitosamente"
    }
    ```

- POST /payments/:id/process (admin)
  - Input: id (path parameter)
  - Output: PaymentAttributes
    ```json
    {
      "id": 1,
      "orderId": 1,
      "amount": 300,
      "status": "completed",
      "method": "card",
      "transactionId": "txn123",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-04T00:00:00.000Z",
      "deletedAt": null
    }
    ```

## Interfaces

```typescript
interface PaymentAttributes {
  id: number;
  orderId: number;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  method: "card" | "paypal" | "bank_transfer";
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

type PaymentCreateAttributes = Omit<
  PaymentAttributes,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
```
