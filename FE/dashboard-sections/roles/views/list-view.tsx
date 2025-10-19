"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import ListTableRow from "../list-table-row";
import { useTranslations } from "next-intl";
import TableToolbar from "../table-toolbar";
const roles = [
  {
    id: 1,
    nameEn: "Pharmacy Assistant",
    nameAr: "مساعد صيدلي",
    descriptionEn:
      "The employee responsible for managing all aspects of procurement and supplies, including handling purchasing activities from both internal and external suppliers, ensuring the timely and high-quality availability of materials.",
    descriptionAr:
      "الموظف المسؤول عن جميع شئون التوريدات من الموردين الداخليين أو الخارجيين، وضمان توافر المستلزمات في الوقت المناسب وبأفضل جودة ممكنة.",
    status: "ACTIVE",
    permissionsCount: 22,
    usersCount: 12,
  },
  {
    id: 2,
    nameEn: "Inventory Manager",
    nameAr: "مدير المخزون",
    descriptionEn:
      "Oversees all inventory control operations, ensuring sufficient stock levels, monitoring product movements, and coordinating with suppliers and warehouse teams.",
    descriptionAr:
      "يشرف على جميع عمليات مراقبة المخزون، وضمان توفر المواد الكافية، وتتبع حركة المنتجات، والتنسيق مع الموردين وفِرق المستودعات.",
    status: "ACTIVE",
    permissionsCount: 19,
    usersCount: 8,
  },
  {
    id: 3,
    nameEn: "Procurement Officer",
    nameAr: "موظف المشتريات",
    descriptionEn:
      "Responsible for evaluating suppliers, negotiating contracts, and ensuring adherence to purchasing policies for efficient and cost-effective supply acquisition.",
    descriptionAr:
      "المسؤول عن تقييم الموردين، والتفاوض على العقود، وضمان الالتزام بسياسات الشراء للحصول على الإمدادات بشكل فعّال ومنخفض التكلفة.",
    status: "INACTIVE",
    permissionsCount: 15,
    usersCount: 5,
  },
  {
    id: 4,
    nameEn: "Sales Representative",
    nameAr: "مندوب المبيعات",
    descriptionEn:
      "Handles customer interactions, promotes products, assists in processing orders, and maintains strong client relationships to drive sales growth.",
    descriptionAr:
      "يتعامل مع العملاء، ويعرض المنتجات، ويساعد في معالجة الطلبات، ويعمل على تعزيز العلاقات مع العملاء لزيادة المبيعات.",
    status: "ACTIVE",
    permissionsCount: 18,
    usersCount: 10,
  },
  {
    id: 5,
    nameEn: "Accounting Supervisor",
    nameAr: "مشرف المحاسبة",
    descriptionEn:
      "Supervises daily accounting operations, ensures compliance with financial policies, prepares reports, and monitors adherence to budgets.",
    descriptionAr:
      "يشرف على العمليات اليومية للمحاسبة، ويتأكد من الالتزام بسياسات المالية، ويعد التقارير، ويراقب الالتزام بالميزانية.",
    status: "ACTIVE",
    permissionsCount: 25,
    usersCount: 6,
  },
  {
    id: 6,
    nameEn: "Quality Assurance Specialist",
    nameAr: "أخصائي ضمان الجودة",
    descriptionEn:
      "Ensures all operations comply with regulatory and internal quality standards through audits, evaluations, and continuous improvement efforts.",
    descriptionAr:
      "يضمن أن جميع العمليات تتوافق مع المعايير التنظيمية والجودة الداخلية من خلال عمليات المراجعة والتحسين المستمر.",
    status: "INACTIVE",
    permissionsCount: 12,
    usersCount: 3,
  },
  {
    id: 7,
    nameEn: "Sales Representative",
    nameAr: "مندوب المبيعات",
    descriptionEn:
      "Handles customer interactions, promotes products, assists in processing orders, and maintains strong client relationships to drive sales growth.",
    descriptionAr:
      "يتعامل مع العملاء، ويعرض المنتجات، ويساعد في معالجة الطلبات، ويعمل على تعزيز العلاقات مع العملاء لزيادة المبيعات.",
    status: "ACTIVE",
    permissionsCount: 18,
    usersCount: 10,
  },
  {
    id: 8,
    nameEn: "Accounting Supervisor",
    nameAr: "مشرف المحاسبة",
    descriptionEn:
      "Supervises daily accounting operations, ensures compliance with financial policies, prepares reports, and monitors adherence to budgets.",
    descriptionAr:
      "يشرف على العمليات اليومية للمحاسبة، ويتأكد من الالتزام بسياسات المالية، ويعد التقارير، ويراقب الالتزام بالميزانية.",
    status: "ACTIVE",
    permissionsCount: 25,
    usersCount: 6,
  },
  {
    id: 9,
    nameEn: "Quality Assurance Specialist",
    nameAr: "أخصائي ضمان الجودة",
    descriptionEn:
      "Ensures all operations comply with regulatory and internal quality standards through audits, evaluations, and continuous improvement efforts.",
    descriptionAr:
      "يضمن أن جميع العمليات تتوافق مع المعايير التنظيمية والجودة الداخلية من خلال عمليات المراجعة والتحسين المستمر.",
    status: "INACTIVE",
    permissionsCount: 12,
    usersCount: 3,
  },
];

export default function ListView() {
  const [viewMode, setViewMode] = useState<"LIST" | "GRID">("LIST");
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-3">
      {/* Title Bar */}
      <div className="flex flex-row justify-between sticky top-0 bg-slate-50 py-2">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold">
            {t("ROLES_MANAGEMENT.LIST_TITLE")}
          </h3>
          <p>{t("ROLES_MANAGEMENT.LIST_SUBTITLE")}</p>
        </div>
        <Button className="bg-emerald-600 h-12 text-sm">
          <Icon icon="gg:add" className="w-6! h-6!" />
          {t("COMMON.ADD_ENTITY", {
            ENTITY_NAME: t("ROLES_MANAGEMENT.INDIFINITE_ENTITY_NAME"),
          })}
        </Button>
      </div>
      {/* View Bar */}
      <div className="flex flex-row justify-between items-end">
        <Badge className="bg-emerald-600">
          <Spinner />
          {t("COMMON.SYNCING")}
        </Badge>
        <div className="h-12 bg-gray-200 rounded-md ">
          <Button
            className={cn(
              "w-12 p-0 h-full bg-gray-200 border-2 border-transparent  transition-all duration-300",
              viewMode === "GRID" && "border-emerald-600"
            )}
            onClick={() => setViewMode("GRID")}
          >
            <Icon
              icon="mingcute:grid-fill"
              className={cn(
                "text-black h-6! w-6! transition-all duration-300",
                viewMode === "GRID" && "text-emerald-600"
              )}
            />
          </Button>
          <Button
            className={cn(
              "w-12 p-0 h-full bg-gray-200 border-2 border-transparent transition-all duration-300",
              viewMode === "LIST" && "border-emerald-600"
            )}
            onClick={() => setViewMode("LIST")}
          >
            <Icon
              icon="f7:menu"
              className={cn(
                "text-black h-6! w-6! transition-all duration-300",
                viewMode === "LIST" && "text-emerald-600"
              )}
            />
          </Button>
        </div>
      </div>
      {/* List View */}
      <div className="flex flex-row gap-3 relative">
        {/* List  */}
        <ul className="flex flex-col gap-3 w-full">
          {roles?.map((role) => (
            <ListTableRow key={role?.id} role={role} />
          ))}
        </ul>
        {/* Toolbar */}
        <TableToolbar />
      </div>
    </div>
  );
}
