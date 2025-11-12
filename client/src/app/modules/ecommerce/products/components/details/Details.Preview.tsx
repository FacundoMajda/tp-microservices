import { Card, CardContent } from "@/app/components/ui/card";
import React from "react";



const DetailsPreview: React.FC<{
  thumbnail?: string;
  slides?: any[];
  name: string;
  isLoading?: boolean;
}> = ({ thumbnail, name, isLoading }) => {
  return (
    <div className="min-w-0 xl:col-span-1">
      <div className="sticky top-20 space-y-4 border-b border-t  h-full">
        {
          isLoading ? (<Card className="animate-pulse h-full">
            <CardContent className="h-full">
              <div className="h-32 bg-muted rounded mb-4"></div>
            </CardContent>
          </Card>) : (<img
            src={thumbnail || "/placeholder-image.jpg"}
            alt={name}
            className="w-full h-full  space-y-4 object-cover rounded-lg"
          />)
        }
      </div>
    </div>
  );
};

export default DetailsPreview;
