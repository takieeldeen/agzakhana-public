import { Category } from "@/types/categories";
import { APIListResponse } from "@/types/common";

export const CATEGORIES_LIST: APIListResponse<Partial<Category>> = {
  status: "success",
  results: 12,
  content: [
    {
      _id: "fhsdkljfhu2",
      nameAr: "العناية بالشعر",
      nameEn: "Hair Care",
      icon: "mingcute:hair-2-line",
    },
    {
      _id: "fhsdkljzkzu2",
      nameAr: "العناية بالبشرة",
      nameEn: "Skin Care",
      icon: "streamline-ultimate:hair-skin",
    },
    {
      _id: "phc001",
      nameAr: "مسكنات الألم",
      nameEn: "Pain Killers",
      icon: "solar:pill-broken",
    },
    {
      _id: "phc002",
      nameAr: "الفيتامينات والمكملات",
      nameEn: "Vitamins & Supplements",
      icon: "arcticons:my-health",
    },
    {
      _id: "phc003",
      nameAr: "أدوية البرد والإنفلونزا",
      nameEn: "Cold & Flu Medicines",
      icon: "streamline-ultimate:medical-condition-flu",
    },
    {
      _id: "phc004",
      nameAr: "أدوية المعدة والهضم",
      nameEn: "Digestive Health",
      icon: "hugeicons:digestion",
    },
    {
      _id: "phc005",
      nameAr: "العناية بالجروح",
      nameEn: "Wound Care",
      icon: "mdi:bandage",
    },
    {
      _id: "phc006",
      nameAr: "منتجات السكري",
      nameEn: "Diabetes Care",
      icon: "gu_idance:no-drug-or-substance",
    },
    {
      _id: "phc007",
      nameAr: "أدوية القلب وضغط الدم",
      nameEn: "Heart & Blood Pressure",
      icon: "pajamas:status-health",
    },
    {
      _id: "phc008",
      nameAr: "العناية الشخصية",
      nameEn: "Personal Care",
      icon: "solar:user-outline",
    },
    {
      _id: "phc009",
      nameAr: "الأمومة والرضاعة",
      nameEn: "Maternity & Nursing",
      icon: "hugeicons:baby-bottle",
    },
    {
      _id: "phc010",
      nameAr: "الإسعافات الأولية",
      nameEn: "First A_id",
      icon: "ph:first-a_id-kit",
    },
    {
      _id: "phc011",
      nameAr: "أدوية الحساسية",
      nameEn: "Allergy Medicines",
      icon: "mdi:flower-pollen",
    },
    {
      _id: "phc012",
      nameAr: "مستحضرات العين والأذن",
      nameEn: "Eye & Ear Care",
      icon: "mdi-light:eye",
    },
    {
      _id: "phc013",
      nameAr: "منتجات الإقلاع عن التدخين",
      nameEn: "Smoking Cessation",
      icon: "mdi:smoking-off",
    },
  ],
};
