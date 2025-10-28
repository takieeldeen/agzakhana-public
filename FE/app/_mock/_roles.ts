import { APIListResponse } from "@/types/common";
import { Role } from "../dashboard-types/roles";

export const USER_PER_ROLE_MOCK_DATA = {
  content: [
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
  status: "success" as const,
  results: 4,
};

export const ROLES_DETAILS_MOCK_DATA = {
  status: "success",
  content: {
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
        _id: "68fdf3a985e96e50c0b1a4d4",
        nameAr: "إدارة الأدوار",
        nameEn: "Roles Management",
        permissions: [
          {
            _id: "68fdf2ef85e96e50c0b1a4c2",
            nameAr: "إضافة دور",
            nameEn: "Add Role",
          },
          {
            _id: "68fdf36985e96e50c0b1a4c3",
            nameAr: "تعديل الدور",
            nameEn: "Edit Role",
          },
          {
            _id: "68fdf38485e96e50c0b1a4c4",
            nameAr: "عرض الأدوار",
            nameEn: "View Roles",
          },
          {
            _id: "68fdf3a985e96e50c0b1a4c5",
            nameAr: "تفعيل/تعطيل الدور",
            nameEn: "Activate/Deactivate Role",
          },
          {
            _id: "68fdf46a85e96e50c0b1a4c6",
            nameAr: "تفاصيل الدور",
            nameEn: "View Role Details",
          },
        ],
      },
    ],

    createdAt: "2025-10-26T19:42:11.532Z",
  },
};
export const ROLES_MOCK_DATA: APIListResponse<Role> = {
  status: "success",
  results: 19,
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
    {
      _id: "10",
      nameEn: "Training Coordinator",
      nameAr: "منسق التدريب",
      descriptionEn:
        "Plans and organizes training sessions to enhance employee skills and ensure compliance with company standards.",
      descriptionAr:
        "يخطط وينظم جلسات التدريب لتعزيز مهارات الموظفين وضمان الالتزام بمعايير الشركة.",
      status: "ACTIVE",
      permissionsCount: 8,
      usersCount: 5,
    },
    {
      _id: "11",
      nameEn: "Operations Supervisor",
      nameAr: "مشرف العمليات",
      descriptionEn:
        "Oversees daily operations, ensures workflow efficiency, and coordinates between departments to achieve organizational goals.",
      descriptionAr:
        "يشرف على العمليات اليومية، ويضمن كفاءة سير العمل، وينسق بين الأقسام لتحقيق أهداف المؤسسة.",
      status: "ACTIVE",
      permissionsCount: 15,
      usersCount: 7,
    },
    {
      _id: "12",
      nameEn: "Procurement Officer",
      nameAr: "مسؤول المشتريات",
      descriptionEn:
        "Manages the purchasing process, negotiates with suppliers, and ensures timely delivery of goods and services within budget.",
      descriptionAr:
        "يدير عملية الشراء، ويتفاوض مع الموردين، ويضمن تسليم السلع والخدمات في الوقت المحدد وضمن الميزانية.",
      status: "INACTIVE",
      permissionsCount: 10,
      usersCount: 2,
    },
    {
      _id: "13",
      nameEn: "Customer Relations Manager",
      nameAr: "مدير علاقات العملاء",
      descriptionEn:
        "Maintains strong relationships with clients, resolves escalated issues, and ensures high levels of customer satisfaction.",
      descriptionAr:
        "يحافظ على علاقات قوية مع العملاء، ويحل المشكلات المتصاعدة، ويضمن مستويات عالية من رضا العملاء.",
      status: "ACTIVE",
      permissionsCount: 18,
      usersCount: 4,
    },
    {
      _id: "14",
      nameEn: "Procurement Officer",
      nameAr: "مسؤول المشتريات",
      descriptionEn:
        "Oversees purchasing activities, negotiates with suppliers, and ensures timely delivery of goods and services within budget.",
      descriptionAr:
        "يشرف على أنشطة الشراء، ويتفاوض مع الموردين، ويضمن تسليم السلع والخدمات في الوقت المحدد وضمن الميزانية.",
      status: "ACTIVE",
      permissionsCount: 12,
      usersCount: 3,
    },
    {
      _id: "15",
      nameEn: "Logistics Coordinator",
      nameAr: "منسق اللوجستيات",
      descriptionEn:
        "Coordinates transportation, inventory, and warehouse operations to ensure efficient supply chain performance.",
      descriptionAr:
        "ينسق عمليات النقل والمخزون والمستودعات لضمان أداء فعال في سلسلة الإمداد.",
      status: "INACTIVE",
      permissionsCount: 9,
      usersCount: 2,
    },
    {
      _id: "16",
      nameEn: "IT Systems Administrator",
      nameAr: "مسؤول أنظمة تكنولوجيا المعلومات",
      descriptionEn:
        "Manages servers, networks, and system security while providing technical support to staff and maintaining uptime reliability.",
      descriptionAr:
        "يدير الخوادم والشبكات وأمن الأنظمة مع تقديم الدعم الفني للموظفين والحفاظ على استقرار الأنظمة.",
      status: "ACTIVE",
      permissionsCount: 22,
      usersCount: 5,
    },
    {
      _id: "17",
      nameEn: "Finance Controller",
      nameAr: "المراقب المالي",
      descriptionEn:
        "Monitors financial performance, prepares reports, and ensures compliance with accounting standards and company policies.",
      descriptionAr:
        "يراقب الأداء المالي، ويعد التقارير، ويضمن الالتزام بمعايير المحاسبة وسياسات الشركة.",
      status: "ACTIVE",
      permissionsCount: 15,
      usersCount: 3,
    },
    {
      _id: "18",
      nameEn: "Marketing Strategist",
      nameAr: "استراتيجي التسويق",
      descriptionEn:
        "Develops marketing strategies, analyzes market trends, and drives brand growth through targeted campaigns.",
      descriptionAr:
        "يضع استراتيجيات التسويق، ويحلل اتجاهات السوق، ويدفع نمو العلامة التجارية من خلال الحملات الموجهة.",
      status: "INACTIVE",
      permissionsCount: 17,
      usersCount: 4,
    },
    {
      _id: "19",
      nameEn: "Human Resources Specialist",
      nameAr: "أخصائي الموارد البشرية",
      descriptionEn:
        "Handles recruitment, employee relations, and training programs to support workforce development and retention.",
      descriptionAr:
        "يتولى مسؤولية التوظيف، وعلاقات الموظفين، وبرامج التدريب لدعم تطوير القوى العاملة والاحتفاظ بها.",
      status: "ACTIVE",
      permissionsCount: 14,
      usersCount: 6,
    },
  ],
};
