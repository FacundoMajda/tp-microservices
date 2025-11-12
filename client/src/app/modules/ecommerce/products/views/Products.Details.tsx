import { useParams } from "react-router-dom";
import { DetailsHeader } from "../components/details/Details.Header";
import DetailsPreview from "../components/details/Details.Preview";
import { DetailsSummary } from "../components/details/Details.Summary";
import DetailsInfo from "../components/details/Details.Info";
import { ProductsRepository } from "../api/repository";

const ProductsDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = ProductsRepository.useProduct(productId!);

  console.log(product);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main p-4 h-full xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto">
        <div className="space-y-8">
          <DetailsHeader
            title={product.name}
            // category={product.category}
            tags={product.tags}
            sku={product.sku}
            brand={product.brand}
            availabilityStatus={product.availabilityStatus}
          />

          <div className="grid gap-4 xl:grid-cols-3">
            <DetailsPreview thumbnail={product.thumbnail} name={product.name} isLoading={isLoading} />
            <div className="space-y-7 xl:col-span-2">
              <DetailsSummary
                price={product.price}
                rating={product.rating || 0}
                stock={product.stock}
                category={product.category}
              />
              <DetailsInfo
                description={product.description}
                dimensions={product.dimensions}
                returnPolicy={product.returnPolicy}
                shippingInformation={product.shippingInformation}
                weight={product.weight}
                warrantyInformation={product.warrantyInformation}
              />
            </div>
          </div>

          {/* <DetailsCarrousel /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
