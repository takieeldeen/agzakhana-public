export type Category = {
  _id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  status: "ACTIVE" | "INACTIVE";
  count: number;
};
