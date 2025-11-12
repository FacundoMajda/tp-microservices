import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Package } from "lucide-react";
import React from "react";
import type { Category } from "../api/repository";

interface ProductsHeaderProps {
  searchQuery: string;
  selectedCategory: string;
  categoriesData?: Category[];
  handleSearch: (query: string) => void;
  handleCategoryChange: (category: string) => void;
}

 const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchQuery,
  selectedCategory,
  categoriesData,
  handleSearch,
  handleCategoryChange,
}) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Package className="h-8 w-8" />
          Productos
        </h1>
        <p className="text-muted-foreground">Explora nuestro catálogo</p>
      </div>
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
    </>
  );
};

export { ProductsHeader };
