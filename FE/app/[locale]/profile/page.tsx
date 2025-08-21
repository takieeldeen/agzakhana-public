import { USER_MOCK_DATA } from "@/_mock/_user";
import FallbackImage from "@/components/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const user = USER_MOCK_DATA;
  return (
    <div className="grid grid-cols-[1.5fr_6fr] py-8">
      <aside className="py-2 flex flex-col items-center gap-4">
        <div className="relative rounded-full overflow-hidden w-64 h-64">
          <FallbackImage
            src={user?.imageUrl}
            height={280}
            width={280}
            alt={user?.name}
          />
        </div>
      </aside>
      <section className="py-2 flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-3xl">Personal Information</h3>
          <Separator className="my-4" />
          <div className="grid grid-cols-3">
            <div className="flex flex-col">
              <strong className="text-lg font-semibold text-gray-600">
                Username
              </strong>
              <strong className="text-xl font-semibold">{user?.name}</strong>
            </div>
            <div className="flex flex-col">
              <strong className="text-lg font-semibold text-gray-600">
                Email
              </strong>
              <strong className="text-xl font-semibold">{user?.email}</strong>
            </div>
            <div className="flex flex-col">
              <strong className="text-lg font-semibold text-gray-600">
                Phone
              </strong>
              <strong className="text-xl font-semibold">
                {user?.phoneNumber}
              </strong>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-3xl">Product Informations</h3>
          <Separator className="my-4" />
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="bg-gray-300">
              <TabsTrigger value="ORDERS">Orders</TabsTrigger>
              <TabsTrigger value="WHISHLIST">Whishlist</TabsTrigger>
              <TabsTrigger value="CART">Cart</TabsTrigger>
            </TabsList>
            <TabsContent value="ORDERS">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="WHISHLIST">
              Change your password here.
            </TabsContent>
            <TabsContent value="CART">Cart</TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
