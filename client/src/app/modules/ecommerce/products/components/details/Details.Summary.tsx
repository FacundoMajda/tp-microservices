import React from "react";
import { CategoryCard, PriceCard, RatingCard, StockCard } from "./Details.Card";

const DetailsSummary: React.FC<{
  price?: number;
  rating?: number;
  stock: number;
  category: string
}> = ({ price, rating, stock, category }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <PriceCard price={price ?? 0} discountPercentage={0} />
      <RatingCard rating={rating ?? 0} />
      <StockCard stock={stock} />
      <CategoryCard category={category} />
    </div>
  );
};

export { DetailsSummary };
