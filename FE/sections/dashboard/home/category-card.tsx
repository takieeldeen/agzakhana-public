import { Category } from "@/types/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale } from "next-intl/server";

export default async function CategoryCard({
  category,
}: {
  category: Category;
}) {
  const locale = await getLocale();
  return (
    <li className="h-32 w-32 aspect-square bg-gray-200 rounded-md flex flex-col items-center justify-center transition-all hover:translate-y-2 duration-300 cursor-pointer font-thin gap-2">
      <Icon
        icon={category?.icon}
        width={64}
        height={64}
        className="text-agzakhana-primary"
      />
      <p className="font-bold text-center leading-none text-sm">
        {category?.[locale === "ar" ? "nameAr" : "nameEn"]}
      </p>
    </li>
  );
}
