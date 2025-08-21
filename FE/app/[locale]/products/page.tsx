import { ListView } from "@/sections/dashboard/products/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Products Page",
  description: "Products Listing Page",
};

export default function ProductsListingPage() {
  return <ListView />;
}
