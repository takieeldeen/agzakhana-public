import { ListView } from "@/sections/dashboard/deals/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Deals Page",
  description: "Deals Listing Page",
};

export default function DealsPage() {
  return <ListView />;
}
