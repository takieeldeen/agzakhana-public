export const FILES_MOCK_DATA = [
  {
    _id: "img_001",
    name: "بطاقة رقم قومي",
    type: "image/jpeg",
    url: "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/Abd_Elhay",
    size: 1024 * 1024 * 3.5,
  },
  {
    _id: "img_002",
    name: "فيش جنائي",
    type: "image/jpeg",
    url: "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/Abd_Elhay",
    size: 1024 * 1024 * 3.5,
  },
  {
    _id: "file_002",
    name: "تعاقد العمل",
    type: "application/pdf",
    url: "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/Abd_Elhay",
    size: 1024 * 1024 * 3.5,
  },
];

export const USER_DETAILS = {
  status: "succcess",
  content: {
    _id: "user-1",
    nameAr: "تقي الدين أحمد علي عمر",
    nameEn: "Takie Eldeen Ahmed Ali Omar",
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/Abd_Elhay",
    status: "ACTIVE",
    roles: [
      {
        _id: "role-1",
        nameAr: "موظف كاشير",
        nameEn: "Cachier",
        status: "ACTIVE",
      },
      {
        _id: "role-2",
        nameAr: "منظم الصيدلية",
        nameEn: "Phramacy Organizer",
        status: "INACTIVE",
      },
      {
        _id: "role-3",
        nameAr: "مندوب مبيعات",
        nameEn: "Sales Officer",
        status: "ACTIVE",
      },
    ],
    branch: {
      _id: "branch-1",
      nameAr: "الخلفاوي",
      nameEn: "El Khalafawy",
    },
    location: {
      lat: 23.54,
      lng: 15.56,
      displayName: "23 ش الشهيد أحمد عصمت - عين شمس",
    },
    phoneNumber: "01112334567",
    updatedAt: "2025-11-01T16:28:05.217Z",
    lastLogin: "2025-11-01T16:28:05.217Z",
    permissionGroups: [
      {
        _id: "69026995e83e339a326bd8b8",
        count: 5,
        nameAr: "إدارة الأدوار",
        nameEn: "Roles Management",
        permissions: [
          {
            _id: "6903b3015c4f8a13303f9aaa",
            nameAr: "تفاصيل الدور",
            nameEn: "View Role Details",
            permissionGroup: "69026995e83e339a326bd8b8",
          },
          {
            _id: "6903b33d5c4f8a13303f9aac",
            nameAr: "تفعيل/تعطيل الدور",
            nameEn: "Activate/Deactivate Role",
            permissionGroup: "69026995e83e339a326bd8b8",
          },
          {
            _id: "6903b35f5c4f8a13303f9aad",
            nameAr: "تعديل الدور",
            nameEn: "Edit Role",
            permissionGroup: "69026995e83e339a326bd8b8",
          },
          {
            _id: "6903b3705c4f8a13303f9aae",
            nameAr: "عرض الأدوار",
            nameEn: "View Roles",
            permissionGroup: "69026995e83e339a326bd8b8",
          },
          {
            _id: "6903b37e5c4f8a13303f9aaf",
            nameAr: "إضافة دور",
            nameEn: "Add Role",
            permissionGroup: "69026995e83e339a326bd8b8",
          },
        ],
      },
      {
        _id: "6903c1635c4f8a13303f9ac3",
        count: 1,
        nameAr: "إدارة المستخدمين",
        nameEn: "Users Management",
        permissions: [
          {
            _id: "6903c1be5c4f8a13303f9ac4",
            nameAr: "إضافة مستخدم",
            nameEn: "Add User",
            permissionGroup: "6903c1635c4f8a13303f9ac3",
          },
        ],
      },
    ],
  },
};
