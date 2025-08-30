import { getAllProducts } from "@/api/products";
import ListingProvider from "@/providers/listing-provider";
import { ListView } from "@/sections/dashboard/products/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Products Page",
  description: "Products Listing Page",
};

export default async function ProductsListingPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    size: string;
    category: string;
    manufacturer: string;
  }>;
}) {
  const { page, size, category, manufacturer } = await searchParams;
  const { results, content, status, error } = await getAllProducts(
    page,
    size,
    category,
    manufacturer
  );
  return (
    <ListingProvider
      content={content}
      results={results}
      status={status}
      error={error}
    >
      <ListView products={content} results={results} page={page} size={size} />
    </ListingProvider>
  );
}
