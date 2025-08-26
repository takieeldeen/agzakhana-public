import mongoose, { Schema } from "mongoose";
import { CategoryType } from "../types/category";

const categorySchema = new Schema<CategoryType>({
  nameAr: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  icon: String,
});

const Category = mongoose.model<CategoryType>("Category", categorySchema);
export default Category;
