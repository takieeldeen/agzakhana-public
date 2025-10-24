export type LocalizedObject = {
  _id: string;
  nameAr: string;
  nameEn: string;
};

export type APIListResponse<T> = {
  status: "success" | "fail";
  results: number;
  content: T[];
};
