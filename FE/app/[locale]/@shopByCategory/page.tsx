import { getAllCategories } from "@/api/categories";
import ShopByCategoryView from "@/sections/dashboard/home/views/shop-by-category-view";

export default async function ShopByCategory() {
  const response = await getAllCategories();
  const { content: categories, results } = response;
  return <ShopByCategoryView categories={categories} results={results} />;
}
