Documentación de Endpoints — DummyJSON Products API

1. Obtener todos los productos

Método: GET
Endpoint: /products
Query Params (opcional):

limit: número de resultados por página (number)

skip: número de elementos a omitir (number)

select: campos específicos separados por comas (string)

sortBy: campo por el cual ordenar (string)

order: "asc" | "desc"

Input:

interface GetProductsQuery {
limit?: number
skip?: number
select?: string
sortBy?: keyof Product
order?: 'asc' | 'desc'
}

Output:

interface GetProductsResponse {
products: Product[]
total: number
skip: number
limit: number
}

2. Obtener un producto por ID

Método: GET
Endpoint: /products/:id

Input:

interface GetProductParams {
id: number
}

Output:

type GetProductResponse = Product

3. Buscar productos

Método: GET
Endpoint: /products/search
Query Params:

q: texto de búsqueda (string)

Input:

interface SearchProductsQuery {
q: string
}

Output:

interface SearchProductsResponse {
products: Product[]
total: number
skip: number
limit: number
}

4. Obtener todas las categorías

Método: GET
Endpoint: /products/categories

Output:

interface ProductCategory {
slug: string
name: string
url: string
}

type GetProductCategoriesResponse = ProductCategory[]

5. Obtener lista simple de categorías

Método: GET
Endpoint: /products/category-list

Output:

type GetCategoryListResponse = string[]

6. Obtener productos por categoría

Método: GET
Endpoint: /products/category/:category

Input:

interface GetProductsByCategoryParams {
category: string
}

Output:

interface GetProductsByCategoryResponse {
products: Product[]
total: number
skip: number
limit: number
}

7. Agregar un producto (simulado)

Método: POST
Endpoint: /products/add

Input:

interface CreateProductBody extends Partial<Product> {
title: string
}

Output:

interface CreateProductResponse extends Product {
id: number
}

8. Actualizar un producto (simulado)

Método: PUT o PATCH
Endpoint: /products/:id

Input:

interface UpdateProductParams {
id: number
}

interface UpdateProductBody extends Partial<Product> {}

Output:

type UpdateProductResponse = Product

9. Eliminar un producto (simulado)

Método: DELETE
Endpoint: /products/:id

Input:

interface DeleteProductParams {
id: number
}

Output:

interface DeleteProductResponse extends Product {
isDeleted: boolean
deletedOn: string // ISO date
}

🧩 Interfaces Base
interface Product {
id: number
title: string
description: string
category: string
price: number
discountPercentage: number
rating: number
stock: number
tags: string[]
brand: string
sku: string
weight: number
dimensions: Dimensions
warrantyInformation: string
shippingInformation: string
availabilityStatus: string
reviews: Review[]
returnPolicy: string
minimumOrderQuantity: number
meta: Meta
thumbnail: string
images: string[]
}

interface Dimensions {
width: number
height: number
depth: number
}

interface Review {
rating: number
comment: string
date: string
reviewerName: string
reviewerEmail: string
}

interface Meta {
createdAt: string
updatedAt: string
barcode: string
qrCode: string
}
