import { Card, CardContent } from "@/app/components/ui/card";
import React from "react";

const OrderSkeleton: React.FC = () => {
    return (
        <Card className="animate-pulse h-full">
            <CardContent className="h-full">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-16 bg-muted rounded w-4/4 mb-2 "></div>
                <div className="h-4 bg-muted rounded-lg w-1/4 mb-3 mt-3 "></div>
                <div className="flex flex-wrap justify-between mb-4 gap-2">
                    <div className="h-3 col-span-1 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-3 col-span-2 bg-muted rounded w-1/4 mb-2"></div>
                </div>
                <div className="h-5 bg-muted rounded w-full"></div>
            </CardContent>
        </Card>
    );
};

const OrdersSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <OrderSkeleton key={index} />
            ))}
        </div>
    );
};

export { OrderSkeleton, OrdersSkeleton };