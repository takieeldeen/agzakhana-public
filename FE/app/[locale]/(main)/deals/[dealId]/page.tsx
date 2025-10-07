import { getDealDetails } from "@/api/deals";
import { DetailsView } from "@/sections/dashboard/deals/views";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Agzakhana | Products Page",
  description: "Products Listing Page",
};
type Props = {
  params: Promise<{ dealId: string }>;
};
export default async function ProductDetaillsPage({ params }: Props) {
  const { dealId } = await params;
  const { deal } = await getDealDetails(dealId);
  if (!deal) notFound();
  return <DetailsView deal={deal} />;
}
