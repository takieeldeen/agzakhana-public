import { APIListResponse } from "@/types/common";
import { Offer } from "@/types/offers";
export const OFFERS_LIST: APIListResponse<Offer> = {
  status: "success",
  results: 4,
  content: [
    {
      id: "sdasdsdasdsad",
      nameAr: "واي بروتين + شيكر + اماينو",
      nameEn: "Whey Protein + Shaker + Amino",
      rating: 3.5,
      manufacturer: "Whey",
      price: 509,
      beforeDiscount: 799,
      expiresAt: "08-11-2025",
      createdAt: "08-01-2025",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/amino.png",
    },
    {
      id: "proteinoffer-001",
      nameAr: "عرض البروتين المميز",
      nameEn: "Premium Protein Bundle",
      rating: 4.2,
      manufacturer: "MuscleTech",
      price: 699,
      beforeDiscount: 899,
      expiresAt: "09-15-2025",
      createdAt: "07-20-2025",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/whe.png",
    },
    {
      id: "vitaminpack-2025",
      nameAr: "حزمة الفيتامينات الشاملة",
      nameEn: "Complete Vitamin Pack",
      rating: 4.5,
      manufacturer: "Nature's Best",
      price: 349,
      beforeDiscount: 499,
      expiresAt: "12-31-2025",
      createdAt: "06-01-2025",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/high_protein%20(1).png",
    },
    {
      id: "fitness-combo-50",
      nameAr: "كومبو اللياقة بخصم 50%",
      nameEn: "Fitness Combo 50% Off",
      rating: 4.0,
      manufacturer: "Optimum Nutrition",
      price: 599,
      beforeDiscount: 1199,
      expiresAt: "10-30-2025",
      createdAt: "08-05-2025",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/combat.png",
    },
    {
      id: "fitness-combo-500",
      nameAr: "كومبو اللياقة بخصم 50%",
      nameEn: "Fitness Combo 50% Off",
      rating: 4.0,
      manufacturer: "Optimum Nutrition",
      price: 599,
      beforeDiscount: 1199,
      expiresAt: "10-30-2025",
      createdAt: "08-05-2025",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/combat.png",
    },
  ],
};
