import { getAllProducts } from "@/api/products";
import { ListView } from "@/sections/dashboard/products/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Products Page",
  description: "Products Listing Page",
};

export default async function ProductsListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; size: string; category: string }>;
}) {
  const { page, size, category } = await searchParams;
  const { results, content, status } = await getAllProducts(
    page,
    size,
    category
  );
  return (
    <ListView products={content} results={results} page={page} size={size} />
  );
}
