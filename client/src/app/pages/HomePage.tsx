import { useEffect } from 'react'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ShoppingBag, Package, CreditCard, TrendingUp, Users, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const navigate = useNavigate()

    useEffect(() => {
        setBreadcrumbs([{ label: 'Home' }])
    }, [setBreadcrumbs])

    return (
        <div className="p-6 space-y-8">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-12">
                <h1 className="text-5xl font-bold mb-4">Bienvenido a FormoShop</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Tu tienda online de confianza. Descubre miles de productos con los mejores precios
                    y envíos rápidos a todo el país.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" onClick={() => navigate('/products')}>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Explorar Productos
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/orders')}>
                        Ver Mis Pedidos
                    </Button>
                </div>
            </div>

            {/* Categories Section */}
            <div>
                <h2 className="text-3xl font-bold mb-6">Categorías Destacadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products')}>
                        <CardHeader>
                            <ShoppingBag className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Beauty & Cosmetics</CardTitle>
                            <CardDescription>
                                Productos de belleza y cuidado personal
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products')}>
                        <CardHeader>
                            <Package className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Furniture & Home</CardTitle>
                            <CardDescription>
                                Muebles y decoración para tu hogar
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products')}>
                        <CardHeader>
                            <TrendingUp className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Groceries</CardTitle>
                            <CardDescription>
                                Alimentos y productos del hogar
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products')}>
                        <CardHeader>
                            <ShoppingBag className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Fragrances</CardTitle>
                            <CardDescription>
                                Perfumes y fragancias exclusivas
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            {/* Features Section */}
            <div>
                <h2 className="text-3xl font-bold mb-6">¿Por qué comprar con nosotros?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <Shield className="h-10 w-10 mb-2 text-green-600" />
                            <CardTitle>Compra Segura</CardTitle>
                            <CardDescription>
                                Transacciones 100% seguras y protegidas. Tu información está segura con nosotros.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="ghost" onClick={() => navigate('/payments')}>Ver métodos de pago →</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Package className="h-10 w-10 mb-2 text-blue-600" />
                            <CardTitle>Envíos Rápidos</CardTitle>
                            <CardDescription>
                                Recibe tus productos en tiempo récord. Seguimiento en tiempo real de tus pedidos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="ghost" onClick={() => navigate('/orders')}>Rastrear pedido →</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="h-10 w-10 mb-2 text-purple-600" />
                            <CardTitle>Soporte 24/7</CardTitle>
                            <CardDescription>
                                Nuestro equipo está disponible para ayudarte en cualquier momento que lo necesites.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="ghost">Contactar soporte →</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-primary text-primary-foreground">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl mb-2">¿Listo para empezar a comprar?</CardTitle>
                    <CardDescription className="text-primary-foreground/80 text-lg">
                        Miles de productos esperándote. Explora nuestro catálogo completo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button size="lg" variant="secondary" onClick={() => navigate('/products')}>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Ver Todos los Productos
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage