import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
    <Drawer open direction="right">
      <DrawerContent className=" data-[vaul-drawer-direction=right]:sm:max-w-none border-l-0 border-r-0 ">
        <DetailsView />
      </DrawerContent>
    </Drawer>
    // <DetailsView />
  );
}
