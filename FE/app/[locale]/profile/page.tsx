import { USER_MOCK_DATA } from "@/_mock/_user";
import { AuthGuard } from "@/components/auth-guard";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { MyOrdersListView } from "@/sections/my-orders/views/list-view";
import PersonalInfoSection from "@/sections/profile/personal-info-section";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export function generateMetadata() {}

export default async function ProfilePage() {
  const user = USER_MOCK_DATA;
  const t = await getTranslations();
  return (
    <AuthGuard>
      <div className="grid grid-cols-[2fr_6fr] py-8">
        <PersonalInfoSection />
        <section className="py-2 flex flex-col gap-6">
          <div>
            <h4 className="text-2xl font-bold ">{t("PROFILE.PRODUCT_INFO")}</h4>
            <Separator className="my-4" />
            <Tabs defaultValue="ORDERS" className="rtl:items-end">
              <TabsList className="bg-gray-200 ">
                <TabsTrigger value="ORDERS" className="">
                  {t("PROFILE.ORDERS")}
                </TabsTrigger>
                {/* <TabsTrigger value="CART">{t("PROFILE.CART")}</TabsTrigger> */}
              </TabsList>
              <TabsContent value="ORDERS" className="w-full">
                <MyOrdersListView />
              </TabsContent>

              {/* <TabsContent value="CART">{t("PROFILE.CART")}</TabsContent> */}
            </Tabs>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
