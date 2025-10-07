import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "ar"
        ? "أجزاخانة | دليلك لمنتجات الرعاية الصحية"
        : "Agzakhana | Your Guide to Health Care Products",
    description:
      locale === "ar"
        ? "ابحث عن أفضل منتجات الرعاية الصحية."
        : "Find the best health care products.",
  };
}

export default async function HomePageLayout({
  children,
  params,
  newsLetter,
  popularProducts,
  shopByCategory,
  latestDeals,
  shopBy,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  popularProducts: React.ReactNode;
  newsLetter: React.ReactNode;
  latestDeals: React.ReactNode;
  shopByCategory: React.ReactNode;
  shopBy: React.ReactNode;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      {newsLetter}
      {children}
      {popularProducts}
      {latestDeals}
      {shopByCategory}
      {shopBy}
      {newsLetter}
    </>
  );
}
