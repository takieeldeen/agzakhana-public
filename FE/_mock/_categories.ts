import { Category } from "@/types/categories";
import { APIListResponse } from "@/types/common";

export const CATEGORIES_LIST: APIListResponse<Category> = {
  status: "success",
  results: 12,
  content: [
    {
      id: "fhsdkljfhu2",
      nameAr: "العناية بالشعر",
      nameEn: "Hair Care",
      icon: "mingcute:hair-2-line",
    },
    {
      id: "fhsdkljzkzu2",
      nameAr: "العناية بالبشرة",
      nameEn: "Skin Care",
      icon: "streamline-ultimate:hair-skin",
    },
    {
      id: "phc001",
      nameAr: "مسكنات الألم",
      nameEn: "Pain Killers",
      icon: "solar:pill-broken",
    },
    {
      id: "phc002",
      nameAr: "الفيتامينات والمكملات",
      nameEn: "Vitamins & Supplements",
      icon: "arcticons:my-health",
    },
    {
      id: "phc003",
      nameAr: "أدوية البرد والإنفلونزا",
      nameEn: "Cold & Flu Medicines",
      icon: "streamline-ultimate:medical-condition-flu",
    },
    {
      id: "phc004",
      nameAr: "أدوية المعدة والهضم",
      nameEn: "Digestive Health",
      icon: "hugeicons:digestion",
    },
    {
      id: "phc005",
      nameAr: "العناية بالجروح",
      nameEn: "Wound Care",
      icon: "mdi:bandage",
    },
    {
      id: "phc006",
      nameAr: "منتجات السكري",
      nameEn: "Diabetes Care",
      icon: "guidance:no-drug-or-substance",
    },
    {
      id: "phc007",
      nameAr: "أدوية القلب وضغط الدم",
      nameEn: "Heart & Blood Pressure",
      icon: "pajamas:status-health",
    },
    {
      id: "phc008",
      nameAr: "العناية الشخصية",
      nameEn: "Personal Care",
      icon: "solar:user-outline",
    },
    {
      id: "phc009",
      nameAr: "الأمومة والرضاعة",
      nameEn: "Maternity & Nursing",
      icon: "hugeicons:baby-bottle",
    },
    {
      id: "phc010",
      nameAr: "الإسعافات الأولية",
      nameEn: "First Aid",
      icon: "ph:first-aid-kit",
    },
    {
      id: "phc011",
      nameAr: "أدوية الحساسية",
      nameEn: "Allergy Medicines",
      icon: "mdi:flower-pollen",
    },
    {
      id: "phc012",
      nameAr: "مستحضرات العين والأذن",
      nameEn: "Eye & Ear Care",
      icon: "mdi-light:eye",
    },
    {
      id: "phc013",
      nameAr: "منتجات الإقلاع عن التدخين",
      nameEn: "Smoking Cessation",
      icon: "mdi:smoking-off",
    },
  ],
};
