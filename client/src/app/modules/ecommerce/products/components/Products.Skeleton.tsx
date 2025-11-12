import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse">
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
  );
};

const ProductsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export { ProductsSkeleton, ProductSkeleton };
