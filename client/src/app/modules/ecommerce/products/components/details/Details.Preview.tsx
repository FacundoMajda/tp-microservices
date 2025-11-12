import React from "react";

const DetailsPreview: React.FC<{
  thumbnail?: string;
  slides?: any[];
  name: string;
}> = ({ thumbnail, name }) => {
  return (
    <div className="min-w-0  xl:col-span-1">
      <div className="sticky top-20 space-y-4 border-b border-t  h-full">
        <img
          src={thumbnail || "/placeholder-image.jpg"}
          alt={name}
          className="w-full h-full  space-y-4 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default DetailsPreview;
