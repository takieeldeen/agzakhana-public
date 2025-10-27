import InterceptingDrawer from "@/components/intercepting-drawer";
import { DrawerContent } from "@/components/ui/drawer";
import DetailsView from "@/dashboard-sections/roles/views/details-view";

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
  return (
    <InterceptingDrawer>
      <DrawerContent className="data-[vaul-drawer-direction=left]:sm:max-w-[1200px] data-[vaul-drawer-direction=right]:sm:max-w-[1200px] border-l-0 border-r-0 will-change-auto [transform:none]">
        <DetailsView />
      </DrawerContent>
    </InterceptingDrawer>
    // <DetailsView />
  );
}
