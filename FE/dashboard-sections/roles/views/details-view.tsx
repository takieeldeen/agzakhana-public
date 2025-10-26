"use client";
import ListItem from "@/components/list-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const role = {
  _id: "Xnjgsdddd_1",
  nameAr: "مساعد صيدلي",
  nameEn: "Pharmacist Assistant",
  descriptionEn:
    "The employee responsible for managing all aspects of procurement and supplies, including handling purchasing activities from both internal and external suppliers, ensuring the timely and high-quality availability of materials.",
  descriptionAr:
    "الموظف المسؤول عن جميع شئون التوريدات من الموردين الداخليين أو الخارجيين، وضمان توافر المستلزمات في الوقت المناسب وبأفضل جودة ممكنة.",
  status: "ACTIVE",
  permissionsCount: 22,
  usersCount: 12,
  createdBy: {
    _id: "1",
    nameAr: "تقي الدين أحمد علي",
    nameEn: "Takie Eldeen Ahmed Ali",
  },
  permissionGroups: [
    {
      _id: "grp1",
      nameAr: "إدارة المستخدمين",
      nameEn: "User Management",
      permissions: [
        { _id: "perm1", nameAr: "عرض المستخدمين", nameEn: "View Users" },
        { _id: "perm2", nameAr: "إضافة مستخدم جديد", nameEn: "Add New User" },
        { _id: "perm3", nameAr: "تعديل بيانات المستخدم", nameEn: "Edit User" },
        { _id: "perm4", nameAr: "حذف مستخدم", nameEn: "Delete User" },
        {
          _id: "perm5",
          nameAr: "تغيير صلاحيات المستخدم",
          nameEn: "Change User Permissions",
        },
      ],
    },
    {
      _id: "grp2",
      nameAr: "إدارة الأدوار",
      nameEn: "Roles Management",
      permissions: [
        { _id: "perm6", nameAr: "عرض الأدوار", nameEn: "View Roles" },
        { _id: "perm7", nameAr: "إضافة دور جديد", nameEn: "Add New Role" },
        { _id: "perm8", nameAr: "تعديل الدور", nameEn: "Edit Role" },
        { _id: "perm9", nameAr: "حذف الدور", nameEn: "Delete Role" },
      ],
    },
    {
      _id: "grp3",
      nameAr: "إدارة المخازن",
      nameEn: "Inventories Management",
      permissions: [
        { _id: "perm10", nameAr: "عرض المخزون", nameEn: "View Inventory" },
        { _id: "perm11", nameAr: "إضافة كمية جديدة", nameEn: "Add New Stock" },
        {
          _id: "perm12",
          nameAr: "تعديل بيانات المخزون",
          nameEn: "Edit Inventory",
        },
        { _id: "perm13", nameAr: "حذف صنف", nameEn: "Delete Item" },
        { _id: "perm14", nameAr: "تتبع الحركة", nameEn: "Track Movements" },
        { _id: "perm15", nameAr: "طباعة التقارير", nameEn: "Print Reports" },
      ],
    },
    {
      _id: "grp4",
      nameAr: "إدارة الفواتير",
      nameEn: "Invoices Management",
      permissions: [
        { _id: "perm16", nameAr: "عرض الفواتير", nameEn: "View Invoices" },
        {
          _id: "perm17",
          nameAr: "إنشاء فاتورة جديدة",
          nameEn: "Create New Invoice",
        },
        { _id: "perm18", nameAr: "تعديل الفاتورة", nameEn: "Edit Invoice" },
        { _id: "perm19", nameAr: "إلغاء الفاتورة", nameEn: "Cancel Invoice" },
        {
          _id: "perm20",
          nameAr: "تحميل الفاتورة PDF",
          nameEn: "Download Invoice PDF",
        },
      ],
    },
    {
      _id: "grp5",
      nameAr: "إدارة العملاء",
      nameEn: "Customer Management",
      permissions: [
        { _id: "perm21", nameAr: "عرض العملاء", nameEn: "View Customers" },
        {
          _id: "perm22",
          nameAr: "إضافة عميل جديد",
          nameEn: "Add New Customer",
        },
        {
          _id: "perm23",
          nameAr: "تعديل بيانات العميل",
          nameEn: "Edit Customer",
        },
        { _id: "perm24", nameAr: "حذف عميل", nameEn: "Delete Customer" },
        {
          _id: "perm25",
          nameAr: "عرض سجل الطلبات",
          nameEn: "View Order History",
        },
      ],
    },
    {
      _id: "grp6",
      nameAr: "إدارة الموردين",
      nameEn: "Suppliers Management",
      permissions: [
        { _id: "perm26", nameAr: "عرض الموردين", nameEn: "View Suppliers" },
        {
          _id: "perm27",
          nameAr: "إضافة مورد جديد",
          nameEn: "Add New Supplier",
        },
        {
          _id: "perm28",
          nameAr: "تعديل بيانات المورد",
          nameEn: "Edit Supplier",
        },
        { _id: "perm29", nameAr: "حذف مورد", nameEn: "Delete Supplier" },
        { _id: "perm30", nameAr: "عرض المشتريات", nameEn: "View Purchases" },
        {
          _id: "perm31",
          nameAr: "توليد تقرير الموردين",
          nameEn: "Generate Supplier Report",
        },
      ],
    },
  ],
  users: [
    {
      _id: "usr_001",
      nameAr: "تقي الدين أحمد علي",
      nameEn: "Takie Eldeen Ahmed Ali",
      email: "takie@agzakhana.com",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/Abd_Elhay",
    },
    {
      _id: "usr_002",
      nameAr: "عبد الرحمن محمد حسن",
      nameEn: "Abdelrahman Mohamed Hassan",
      email: "abdo@agzakhana.com",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/abdelwahed",
    },
    {
      _id: "usr_003",
      nameAr: "سارة محمود عبد الله",
      nameEn: "Sara Mahmoud Abdallah",
      email: "sara@agzakhana.com",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/ahmed",
    },
    {
      _id: "usr_004",
      nameAr: "يوسف إبراهيم علي",
      nameEn: "Youssef Ibrahim Ali",
      email: "youssef@agzakhana.com",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/alaa",
    },
  ],
  createdAt: "2025-10-26T19:42:11.532Z",
};
export default function DetailsView() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="h-full dark:bg-dark-card">
      {/* Details Header */}
      <div className="bg-emerald-600 h-1/8 p-6 flex flex-row gap-3">
        <div className="h-full w-fit">
          <Icon
            icon="qlementine-icons:user-16"
            className="h-full w-full text-emerald-700"
          />
        </div>
        <div className="flex-1 ">
          <div>
            <h3 className="text-xl font-bold text-white flex flex-row items-center gap-3">
              {locale === "ar" ? role?.nameAr : role?.nameEn}
              <span className="text-xs font-semibold text-white bg-emerald-800 px-2 py-1 rounded-full ">
                {t(`COMMON.${role?.status}`)}
              </span>
            </h3>
            <p className="text-input dark:text-gray-200">{`${t(
              "ROLES_MANAGEMENT.PERMISSIONS_CNT",
              { count: 9 }
            )} - ${t("ROLES_MANAGEMENT.USERS_WITH_PERMISSIONS", {
              count: 0,
            })}`}</p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 ">
          <Button
            variant="ghost"
            className="border-2 border-white text-white h-12 min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200"
          >
            <Icon icon="iconamoon:edit-light" className="h-6! w-6!" />
            {t("COMMON.EDIT_TITLE", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            })}
          </Button>
          <Button
            variant="ghost"
            className="border-2 border-white text-white h-12 min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200"
          >
            <Icon icon="ci:pause" className="h-6! w-6!" />
            {t("COMMON.DEACTIVATE_TITLE", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            })}
          </Button>
        </div>
      </div>
      {/* Details Content */}
      <div className="relative h-full ">
        <div className=" overflow-hidden bg-red-500 h-full absolute overflow-y-auto">
          <div className="p-3 flex flex-col gap-6 dark:bg-dark-card ">
            <div className="flex flex-row gap-3">
              <ListItem
                primaryLabel={t("COMMON.STATUS")}
                secondaryLabel={t(`COMMON.${role?.status}`)}
              />
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.PERMISSIONS_COUNT")}
                secondaryLabel={role?.permissionsCount}
              />
            </div>
            <ListItem
              primaryLabel={t("ROLES_MANAGEMENT.ROLE_DESCRIPTION")}
              secondaryLabel={
                locale === "ar" ? role?.descriptionAr : role?.descriptionEn
              }
            />
            <div className="">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.ROLE_PERMISSIONS")}
                className="mb-2"
              />
              <Accordion type="multiple" className="w-full">
                <ul className="flex flex-col gap-3">
                  {role?.permissionGroups?.map((group) => (
                    <li key={group?._id}>
                      <AccordionItem value={group?._id}>
                        <AccordionTrigger className="bg-gray-200 dark:bg-dark-background dark:text-white rounded-t-2xl rounded-b-none px-2 hover:no-underline cursor-pointer text-lg text-black [&[data-state=closed]]:rounded-b-2xl">
                          {locale === "ar" ? group?.nameAr : group?.nameEn}
                        </AccordionTrigger>
                        <AccordionContent className="bg-gray-100 rounded-b-2xl rounded-t-none p-2 py-6 flex flex-row gap-2 flex-wrap text-balance dark:bg-dark-900">
                          {group?.permissions?.map((permission) => (
                            <span
                              key={permission?._id}
                              className="bg-emerald-600 rounded-full w-fit px-4 py-0.5 text-white"
                            >
                              {locale === "ar"
                                ? permission?.nameAr
                                : permission?.nameEn}
                            </span>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
            <div className="flex flex-row gap-3">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.CREATED_BY")}
                secondaryLabel={
                  locale === "ar"
                    ? role?.createdBy?.nameAr
                    : role?.createdBy?.nameEn
                }
              />
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.CREATED_AT")}
                secondaryLabel={new Intl.DateTimeFormat(
                  locale === "ar" ? "ar-EG" : "en-US",
                  {
                    day: "2-digit",
                    weekday: "long",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ).format(new Date(role?.createdAt ?? ""))}
              />
            </div>
            <div className="">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.USERS_INFO_WITH_PERMISSIONS")}
                className="mb-4"
              />
              <div className="flex flex-row gap-3 flex-wrap">
                {role?.users?.map((user) => (
                  <div
                    key={user?._id}
                    className="flex w-[calc(50%_-_12px)] gap-3 flex-row shrink-0"
                  >
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-row flex-1 justify-between">
                      <div className="flex flex-col">
                        <p className="text-black text-lg font-semibold dark:text-white">
                          {locale === "ar" ? user?.nameAr : user?.nameEn}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {user?.email}
                        </p>
                      </div>
                      <Button
                        className="rounded-full h-12 w-32 text-rose-800 dark:text-rose-600 border-rose-800 dark:border-rose-600 border-2 hover:bg-rose-800 hover:dark:bg-rose-600 hover:dark:text-white hover:text-white"
                        variant="ghost"
                      >
                        <Icon icon="mynaui:trash" className="h-6! w-6!" />
                        {t("ROLES_MANAGEMENT.DELETE")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
