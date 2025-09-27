import { USER_MOCK_DATA } from "@/_mock/_user";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyOrdersListView } from "@/sections/my-orders/views/list-view";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ProfilePage() {
  const user = USER_MOCK_DATA;
  const t = await getTranslations();
  return (
    <div className="grid grid-cols-[1.5fr_6fr] py-8">
      <aside className="py-2 flex flex-col items-center gap-4">
        {!user?.imageUrl && (
          <div className="bg-gray-200 h-64 w-64 rounded-full shrink-0 aspect-square flex items-center justify-center">
            <Icon
              icon="solar:user-linear"
              className="text-[10rem] text-gray-400"
            />
          </div>
        )}
        {!!user?.imageUrl && (
          <div className="bg-gray-200 h-64 w-64 rounded-full shrink-0 aspect-square flex items-center justify-center overflow-hidden relative">
            <Image
              src={user?.imageUrl}
              alt={user?.name}
              fill
              className="object-contain"
            />
          </div>
        )}
      </aside>
      <section className="py-2 flex flex-col gap-6">
        <div>
          <h4 className="text-2xl font-bold ">{t("PROFILE.PERSONAL_INFO")}</h4>
          <Separator className="my-4" />
          <div className="grid grid-cols-3">
            <div className="flex flex-col">
              <strong className="text-base font-semibold text-gray-600">
                {t("PROFILE.USERNAME")}
              </strong>
              <strong className="text-lg font-semibold">{user?.name}</strong>
            </div>
            <div className="flex flex-col">
              <strong className="text-base font-semibold text-gray-600">
                {t("PROFILE.EMAIL")}
              </strong>
              <strong className="text-lg font-semibold">{user?.email}</strong>
            </div>
            <div className="flex flex-col">
              <strong className="text-base font-semibold text-gray-600">
                {t("PROFILE.PHONE")}
              </strong>
              <strong className="text-lg font-semibold">
                {user?.phoneNumber}
              </strong>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-bold ">{t("PROFILE.PRODUCT_INFO")}</h4>
          <Separator className="my-4" />
          <Tabs defaultValue="ORDERS" className="items-end">
            <TabsList className="bg-gray-200">
              <TabsTrigger value="ORDERS">{t("PROFILE.ORDERS")}</TabsTrigger>
              <TabsTrigger value="CART">{t("PROFILE.CART")}</TabsTrigger>
            </TabsList>
            <TabsContent value="ORDERS" className="w-full">
              <MyOrdersListView />
            </TabsContent>

            <TabsContent value="CART">{t("PROFILE.CART")}</TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
