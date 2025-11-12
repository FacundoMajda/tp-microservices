import React from "react";
import type { Product } from "../api/repository";
import { ProductCard } from "./Products.Card";

const ProductsList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export { ProductsList };
