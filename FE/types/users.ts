export type UserType = {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
  address: string;
  gender: "MALE" | "FEMALE";
  birthDate: Date;
};
