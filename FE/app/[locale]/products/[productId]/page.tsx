import { getProductDetails } from "@/api/products";
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
  const { product } = await getProductDetails(productId);
  if (!product) notFound();
  return <DetailsView product={product} />;
}
