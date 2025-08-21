import { APIListResponse } from "@/types/common";
import { Medicine } from "@/types/medcines";

export const POPULAR_ITEM_LIST: APIListResponse<Medicine> = {
  status: "success",
  results: 13,
  content: [
    {
      id: "sgfmbovcx-23435",
      nameAr: "بانادول كولد اند فلو النهاري",
      nameEn: "Panadol Cold and Flu Day",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 3.5,
      manufacturer: "GSK",
      price: 28.85,
      beforeDiscount: 32.8,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/spohxo.png",
    },
    {
      id: "sgfmbovcx-23436",
      nameAr: "فولتارين جل",
      nameEn: "Voltaren Gel",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.2,
      manufacturer: "Novartis",
      price: 45.0,
      beforeDiscount: 50.0,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/vaporub.png",
    },
    {
      id: "sgfmbovcx-23437",
      nameAr: "كونجستال أقراص",
      nameEn: "Congestal Tablets",
      category: {
        id: "2",
        nameAr: "نزلات البرد",
        nameEn: "Cold & Flu",
      },
      rating: 4.0,
      manufacturer: "Delta Pharma",
      price: 18.5,
      beforeDiscount: 20.0,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/benylyn.png",
    },
    {
      id: "sgfmbovcx-23438",
      nameAr: "بروفين 400 مجم",
      nameEn: "Brufen 400mg",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.5,
      manufacturer: "Abbott",
      price: 32.0,
      beforeDiscount: 35.0,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chest-eze.png",
    },
    {
      id: "sgfmbovcx-23439",
      nameAr: "إيموكس 500 مجم",
      nameEn: "Amox 500mg",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.3,
      manufacturer: "GlaxoSmithKline",
      price: 42.75,
      beforeDiscount: 48.0,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chesty.png",
    },

    {
      id: "sgfmbovcx-23441",
      nameAr: "ديكساميثازون أمبول",
      nameEn: "Dexamethasone Ampoule",
      category: {
        id: "4",
        nameAr: "كورتيكوستيرويد",
        nameEn: "Corticosteroid",
      },
      rating: 4.6,
      manufacturer: "Amoun",
      price: 15.0,
      beforeDiscount: 18.0,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/humex.png",
    },
    {
      id: "sgfmbovcx-23442",
      nameAr: "ريفو أقراص",
      nameEn: "Rivo Tablets",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.0,
      manufacturer: "CID Pharma",
      price: 10.5,
      beforeDiscount: 12.0,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/benylyn.png",
    },
    {
      id: "sgfmbovcx-23443",
      nameAr: "فينادون شراب",
      nameEn: "Fenadone Syrup",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4.4,
      manufacturer: "Memphis",
      price: 22.0,
      beforeDiscount: 25.0,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chest-eze.png",
    },
    {
      id: "sgfmbovcx-23444",
      nameAr: "أوجمنتين 1جم",
      nameEn: "Augmentin 1g",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.7,
      manufacturer: "GSK",
      price: 85.0,
      beforeDiscount: 90.0,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chesty.png",
    },
    {
      id: "sgfmbovcx-23445",
      nameAr: "إيبوبروفين شراب",
      nameEn: "Ibuprofen Syrup",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.2,
      manufacturer: "Pfizer",
      price: 18.0,
      beforeDiscount: 20.0,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/humex.png",
    },
    {
      id: "sgfmbovcx-23446",
      nameAr: "ميوكوسول شراب",
      nameEn: "Mucosol Syrup",
      category: {
        id: "6",
        nameAr: "طارد بلغم",
        nameEn: "Expectorant",
      },
      rating: 4.1,
      manufacturer: "Amoun",
      price: 19.5,
      beforeDiscount: 22.0,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/mucosolban.png",
    },
    {
      id: "sgfmbovcx-23447",
      nameAr: "سيتريزين أقراص",
      nameEn: "Cetirizine Tablets",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4.5,
      manufacturer: "Tabuk Pharma",
      price: 15.0,
      beforeDiscount: 18.0,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/panadol.png",
    },
  ],
};
