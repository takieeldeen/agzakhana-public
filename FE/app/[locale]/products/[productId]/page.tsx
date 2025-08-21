import { PRODUCT_LISTING_PAGE } from "@/_mock/_products_listing";
import { dummyPromise } from "@/api/api";
import { DetailsView } from "@/sections/dashboard/products/views";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Agzakhana | Products Page",
  description: "Products Listing Page",
};
type Props = {
  params: Promise<{ productId: string }>;
};
export default async function ProductDetaillsPage({ params }: Props) {
  const { productId } = await params;
  const test = await dummyPromise();
  console.log(test);
  const product = PRODUCT_LISTING_PAGE?.content?.find(
    (product) => product?.id === productId
  );
  if (!product) notFound();
  return <DetailsView product={product} />;
}
