import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../api/repository";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={product.id}
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardHeader>
        <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.thumbnail || "/placeholder-image.jpg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{product.category}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">${product.price}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock}
            </p>
          </div>
        </div>

        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export { ProductCard };
