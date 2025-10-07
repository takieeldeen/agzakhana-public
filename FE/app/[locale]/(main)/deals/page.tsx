import { getAllDeals } from "@/api/deals";
import ListingProvider from "@/providers/listing-provider";
import { ListView } from "@/sections/dashboard/deals/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Deals Page",
  description: "Deals Listing Page",
};

export default async function DealsPage({
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
  const { results, content, status, error } = await getAllDeals(
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
      <ListView list={content} results={results} page={page} size={size} />
    </ListingProvider>
  );
}
