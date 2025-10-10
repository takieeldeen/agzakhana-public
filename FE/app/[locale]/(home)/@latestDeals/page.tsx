import { getLatestDeals } from "@/client-api/deals";
import LatestDealsView from "@/sections/dashboard/home/views/latest-deals-view";

export default async function LatestDeals() {
  const res = await getLatestDeals();
  const { content: deals, results } = res;
  return <LatestDealsView deals={deals} results={results} />;
}
