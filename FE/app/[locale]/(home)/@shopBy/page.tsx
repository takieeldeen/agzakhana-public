import { getProductHighlights } from "@/client-api/products";
import { ShopBy } from "@/sections/dashboard/home/views";

export default async function ShopByPage() {
  const { content: products, results } = await getProductHighlights();
  return <ShopBy products={products} results={results} />;
}
