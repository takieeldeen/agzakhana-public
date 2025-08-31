import mongoose from "mongoose";

export const DEALS = [
  {
    id: "sdasdsdasdsad",
    nameAr: "واي بروتين + شيكر + اماينو",
    nameEn: "Whey Protein + Shaker + Amino",
    rating: 3.5,
    manufacturer: "Whey",
    price: 509,
    beforeDiscount: 799,
    expiresAt: "2025-08-10T21:00:00.000Z",
    createdAt: "2025-07-31T21:00:00.000Z",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/amino.png",
    qty: 6,
    maxQty: 3,
    category: new mongoose.Types.ObjectId("68ae00041d5513897936eaa9"),
  },
  {
    id: "proteinoffer-001",
    nameAr: "عرض البروتين المميز",
    nameEn: "Premium Protein Bundle",
    category: new mongoose.Types.ObjectId("68ae00041d5513897936eaa9"),

    rating: 4.2,
    manufacturer: "MuscleTech",
    price: 699,
    beforeDiscount: 899,
    expiresAt: "2025-09-14T21:00:00.000Z",
    createdAt: "2025-07-19T21:00:00.000Z",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/whe.png",
    qty: 7,
    maxQty: 4,
  },
  {
    id: "vitaminpack-2025",
    nameAr: "حزمة الفيتامينات الشاملة",
    nameEn: "Complete Vitamin Pack",
    category: new mongoose.Types.ObjectId("68ae00041d5513897936eaa9"),

    rating: 4.5,
    manufacturer: "Nature's Best",
    price: 349,
    beforeDiscount: 499,
    expiresAt: "2025-12-30T22:00:00.000Z",
    createdAt: "2025-05-31T21:00:00.000Z",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/high_protein%20(1).png",
    qty: 4,
    maxQty: 4,
  },
  {
    id: "fitness-combo-50",
    nameAr: "كومبو اللياقة بخصم 50%",
    nameEn: "Fitness Combo 50% Off",
    rating: 4,
    manufacturer: "Optimum Nutrition",
    price: 599,
    beforeDiscount: 1199,
    expiresAt: "2025-10-29T21:00:00.000Z",
    createdAt: "2025-08-04T21:00:00.000Z",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/combat.png",
    category: new mongoose.Types.ObjectId("68ae00041d5513897936eaa5"),

    qty: 5,
    maxQty: 2,
  },
  {
    id: "fitness-combo-500",
    nameAr: "كومبو اللياقة بخصم 50%",
    nameEn: "Fitness Combo 50% Off",
    rating: 4,
    manufacturer: "Optimum Nutrition",
    price: 599,
    beforeDiscount: 1199,
    expiresAt: "2025-10-29T21:00:00.000Z",
    createdAt: "2025-08-04T21:00:00.000Z",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/combat.png",
    category: new mongoose.Types.ObjectId("68ae00041d5513897936eaaf"),

    qty: 0,
    maxQty: 4,
  },
];
