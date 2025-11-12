import React from "react";
import { PriceCard, RatingCard, StockCard } from "./Details.Card";

const DetailsSummary: React.FC<{
  price?: number;
  rating?: number;
  stock: number;
}> = ({ price, rating, stock }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <PriceCard price={price ?? 0} discountPercentage={0} />
      <RatingCard rating={rating ?? 0} />
      <StockCard stock={stock} />
    </div>
  );
};

export { DetailsSummary };
