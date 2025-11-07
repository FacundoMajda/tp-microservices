import { useState } from 'react'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { ProductsRepository, type Category } from '../modules/ecommerce/products/repository'
import { Package, Star, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'

const ProductsPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    // Queries
    const { data: productsData, isLoading: productsLoading } = ProductsRepository.useProducts()
    const { data: categoriesData } = ProductsRepository.useCategories()
    const { data: searchData, isLoading: searchLoading } = ProductsRepository.useSearchProducts(searchQuery, { limit: 10 })
    const { data: categoryData, isLoading: categoryLoading } = ProductsRepository.useProductsByCategory(selectedCategory === "all" ? "" : selectedCategory, { limit: 10 })

    const products = searchQuery ? searchData?.products : (selectedCategory !== "all" ? categoryData?.products : productsData?.products)
    const isLoading = productsLoading || searchLoading || categoryLoading

    useEffect(() => {
        setBreadcrumbs([{ label: 'Products' }])
    }, [setBreadcrumbs])

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setSelectedCategory('all')
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setSearchQuery('')
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <Package className="h-8 w-8" />
                    Productos
                </h1>
                <p className="text-muted-foreground">Explore our product catalog</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las categorias</SelectItem>
                        {categoriesData?.map((category: Category) => (
                            <SelectItem key={category.slug} value={category.slug}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-4 bg-muted rounded w-3/4"></div>
                                <div className="h-3 bg-muted rounded w-1/2"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-32 bg-muted rounded mb-4"></div>
                                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                                <div className="h-3 bg-muted rounded w-1/2"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <Card key={product.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {product.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{product.rating}</span>
                                    </div>
                                    <Badge variant="secondary">{product.category}</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">${product.price}</p>
                                        {product.discountPercentage > 0 && (
                                            <p className="text-sm text-muted-foreground line-through">
                                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                                        <p className="text-sm font-medium">{product.brand}</p>
                                    </div>
                                </div>

                                <Button className="w-full" size="sm">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {!isLoading && products?.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    )
}

export default ProductsPage