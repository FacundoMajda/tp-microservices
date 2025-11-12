// price: number,
// rating: number,
// stock: number

import { Card } from "@/app/components/ui/card";
import { DollarSign, ListTree, PackageSearch, Star } from "lucide-react";

const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  return price - (price * discountPercentage) / 100;
};

const PriceCard: React.FC<{ price: number; discountPercentage: number }> = ({
  price,
  discountPercentage,
}) => {
  return (
    <Card className="hover:border-primary/55 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
      <DollarSign />
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">Precio</span>
        <span className="text-lg font-semibold">
          {discountPercentage ? (
            <>
              <span className="line-through text-sm text-red-500 mr-2">
                ${price.toFixed(2)}
              </span>
              <span>
                $
                {calculateDiscountedPrice(price, discountPercentage).toFixed(2)}
              </span>
            </>
          ) : (
            `$${price.toFixed(2)}`
          )}
        </span>
      </div>
    </Card>
  );
};

const RatingCard: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <Card className="hover:border-primary/55 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
      <Star />
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">Valoración</span>
        <span className="text-lg font-semibold">
          {`${rating.toFixed(2)} / 5`}
        </span>
      </div>
    </Card>
  );
};

const StockCard: React.FC<{ stock: number }> = ({ stock }) => {
  return (
    <Card className="hover:border-primary/55 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
      <PackageSearch />
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">Stock</span>
        <span className="text-lg font-semibold">{stock}</span>
      </div>
    </Card>
  );
};

const CategoryCard: React.FC<{ category: string }> = ({ category }) => {
  return (
    <Card className="hover:border-primary/55 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
      <ListTree />
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">Categoría</span>
        <span className="text-lg font-semibold">{category}</span>
      </div>
    </Card>
  );
};

export { PriceCard, RatingCard, StockCard, CategoryCard };
