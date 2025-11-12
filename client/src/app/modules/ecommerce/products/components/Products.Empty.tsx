import { Package } from "lucide-react";

const ProductsEmpty = () => {
  return (
    <div className="text-center py-12">
      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
      <p className="text-muted-foreground">
        Intenta ajustar tu búsqueda o los filtros
      </p>
    </div>
  );
};

export { ProductsEmpty };
