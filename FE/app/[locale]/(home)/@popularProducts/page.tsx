import { getPopularProducts } from "@/client-api/products";
import PopularProductsView from "@/sections/dashboard/home/views/popular-products-view";

export default async function PopularProductsSection() {
  const { content: products, results } = await getPopularProducts();
  return <PopularProductsView products={products} results={results} />;
}
