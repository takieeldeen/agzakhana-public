import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productsModel";
import { PRODUCTS } from "../mock/_products";
import { CATEGORIES } from "../mock/_categories";
import Category from "../models/categoriesModel";
import Deal from "../models/dealsModel";
import { DEALS } from "../mock/_deals";
import Comment from "../models/commentModel";
import { REVIEWS } from "../mock/_comments";

export const prefillProducts = catchAsync(
  async (req: Request, res: Response) => {
    await Product.insertMany(PRODUCTS);
    res.status(200).json({
      status: "success",
    });
  }
);
export const prefillCategories = catchAsync(
  async (req: Request, res: Response) => {
    await Category.insertMany(CATEGORIES);
    res.status(200).json({
      status: "success",
    });
  }
);

export const prefillDeals = catchAsync(async (req: Request, res: Response) => {
  await Deal.insertMany(DEALS);
  res.status(200).json({
    status: "success",
  });
});

export const prefillReviews = catchAsync(
  async (req: Request, res: Response) => {
    await Comment.insertMany(REVIEWS);
    res.status(200).json({
      status: "success",
    });
  }
);
