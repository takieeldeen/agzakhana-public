import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productsModel";
import mongoose from "mongoose";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { page, limit, category } = req?.query;
    const params: {
      page: number;
      limit: number;
      filters: { [prop: string]: any };
    } = {
      page: page ? +page : 1,
      limit: limit ? +limit : 20,
      filters: {},
    };
    console.log(params);
    if (category)
      params.filters.category = new mongoose.Types.ObjectId(category as string);
    const count = await Product.countDocuments(params.filters);

    const products = await Product.find(params.filters)
      .populate("category")
      .limit(params.limit)
      .skip(params.limit * (params.page - 1))
      .select([
        "nameAr",
        "nameEn",
        "tag",
        "imageUrl",
        "category",
        "manufacturer",
        "price",
        "beforeDiscount",
      ]);
    res.status(200).json({
      status: "success",
      results: count,
      content: products,
    });
  }
);
