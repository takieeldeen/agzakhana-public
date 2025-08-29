import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productsModel";
import mongoose from "mongoose";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { page, limit, category, manufacturer } = req?.query;

    const params: {
      page: number;
      limit: number;
      filters: { [prop: string]: any };
    } = {
      page: page ? +page : 1,
      limit: limit ? +limit : 20,
      filters: {},
    };
    if (category) {
      const categories = category
        ?.toString()
        ?.split(",")
        ?.map((category) => new mongoose.Types.ObjectId(category));
      params.filters.category = { $in: categories };
    }
    if (manufacturer) {
      const manufacturers = manufacturer?.toString()?.split(",");
      params.filters.manufacturer = { $in: manufacturers };
    }
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

export const getProductDetails = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.status(200).json({
    status: "success",
    content: product,
  });
});

export const getAllManufacturer = catchAsync(
  async (req: Request, res: Response) => {
    const manufacturers = await Product.aggregate([
      { $group: { _id: "$manufacturer", count: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
      { $match: { count: { $gt: 0 } } },
      { $sort: { count: -1, name: 1 } },
    ]);
    res.status(200).json({
      status: "success",
      content: manufacturers,
    });
  }
);
