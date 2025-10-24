import { APIListResponse, LocalizedObject } from "@/types/common";
import { Role } from "../dashboard-types/roles";

export const ROLES_MOCK_DATA: APIListResponse<Role> = {
  status: "success",
  results: 9,
  content: [
    {
      _id: "1",
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
      _id: "2",
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
      _id: "3",
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
      _id: "4",
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
      _id: "5",
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
      _id: "6",
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
      _id: "7",
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
      _id: "8",
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
      _id: "9",
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
  ],
};

export const PERMISSIONS_HELPER_MOCK_DATA: APIListResponse<LocalizedObject> = {
  results: 9,
  status: "success",
  content: [
    {
      _id: "6718d20a6f9a5b3c1a9f0a01",
      nameAr: "عرض المستخدمين",
      nameEn: "View Users",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a02",
      nameAr: "إضافة مستخدم",
      nameEn: "Add User",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a03",
      nameAr: "تعديل المستخدم",
      nameEn: "Edit User",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a04",
      nameAr: "حذف المستخدم",
      nameEn: "Delete User",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a05",
      nameAr: "عرض الأذونات",
      nameEn: "View Permissions",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a06",
      nameAr: "إضافة إذن",
      nameEn: "Add Permission",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a07",
      nameAr: "تعديل الإذن",
      nameEn: "Edit Permission",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a08",
      nameAr: "حذف الإذن",
      nameEn: "Delete Permission",
    },
    {
      _id: "6718d20a6f9a5b3c1a9f0a09",
      nameAr: "عرض التقارير",
      nameEn: "View Reports",
    },
  ],
};
