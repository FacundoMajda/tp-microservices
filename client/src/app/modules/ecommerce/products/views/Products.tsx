import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useState } from "react";

import { useEffect } from "react";
import {
  ProductsEmpty,
  ProductsHeader,
  ProductsList,
  ProductsSkeleton,
} from "../components";
import { ProductsRepository } from "../api/repository";

const Products = () => {
  const { setBreadcrumbs } = useBreadcrumbs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Queries
  const { data: productsData, isLoading: productsLoading } =
    ProductsRepository.useProducts();
  const { data: categoriesData } = ProductsRepository.useCategories();
  const { data: searchData, isLoading: searchLoading } =
    ProductsRepository.useSearchProducts(searchQuery, { limit: 10 });
  const { data: categoryData, isLoading: categoryLoading } =
    ProductsRepository.useProductsByCategory(
      selectedCategory === "all" ? "" : selectedCategory,
      { limit: 10 }
    );

  const products = searchQuery
    ? searchData?.products
    : selectedCategory !== "all"
    ? categoryData?.products
    : productsData?.products;
  const isLoading = productsLoading || searchLoading || categoryLoading;

  useEffect(() => {
    setBreadcrumbs([{ label: "Products" }]);
  }, [setBreadcrumbs]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <ProductsHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categoriesData={categoriesData}
        handleSearch={handleSearch}
        handleCategoryChange={handleCategoryChange}
      />

      {/* Products Grid */}
      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <ProductsList products={products || []} />
      )}

      {!isLoading && products?.length === 0 && <ProductsEmpty />}
    </div>
  );
};

export default Products;
