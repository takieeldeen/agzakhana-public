import DetailsView from "@/dashboard-sections/users/views/details-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "تفاصيل الدور" : "Role Details",
    description:
      locale === "ar" ? "معرفة جميع بيانات الدور" : "Check all role details.",
  };
}

export default function Page() {
  return <DetailsView />;
}
