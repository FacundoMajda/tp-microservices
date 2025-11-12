import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import React from "react";

const DetailsHeader: React.FC<{
  title: string;
  category: string;
  tags?: string[];
  sku?: string;
  brand?: string;
  availabilityStatus?: string;
}> = ({ title, category, tags, sku, brand, availabilityStatus }) => {
  return (
    <div className="flex flex-row items-start justify-between">
      <div className="space-y-2">
        <h1 className="font-display font-bold text-xl tracking-tight lg:text-3xl">
          {title}
          {brand && (
            <>
              <Separator
                orientation="vertical"
                className="mx-2 inline-block h-6"
              />
              <span className="italic text-muted-foreground">{brand}</span>
            </>
          )}
        </h1>
        <div className="text-muted-foreground inline-flex flex-col gap-2 text-sm lg:flex-row lg:gap-4">
          <p className="text-sm text-muted-foreground">Category: {category}</p>
          {sku && <p className="text-sm text-muted-foreground">SKU: {sku}</p>}
        </div>
        {availabilityStatus && (
          <Badge
            variant={
              availabilityStatus === "In Stock" ? "default" : "destructive"
            }
          >
            {availabilityStatus}
          </Badge>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button>Soy un boton</Button>
        <Button>Soy un boton</Button>
      </div>
    </div>
  );
};

export { DetailsHeader };
