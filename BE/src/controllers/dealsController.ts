import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import mongoose from "mongoose";
import Deal from "../models/dealsModel";

export const addToDeals = catchAsync(async (req: Request, res: Response) => {});

export const getAllDeals = catchAsync(async (req: Request, res: Response) => {
  const { page, category, limit, manufacturer } = req.query;

  const params: {
    page: number;
    limit: number;
    filters: { [prop: string]: any };
  } = {
    page: page ? +page : 1,
    limit: limit ? +limit : 20,
    filters: {
      expiresAt: { $gt: new Date() },
    },
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
  const count = await Deal.countDocuments(params.filters);

  const products = await Deal.find(params.filters)
    .populate("category")
    .limit(params.limit)
    .skip(params.limit * (params.page - 1));
  // .select([
  //   "nameAr",
  //   "nameEn",
  //   "tag",
  //   "imageUrl",
  //   "category",
  //   "manufacturer",
  //   "price",
  //   "beforeDiscount",
  // ]);
  res.status(200).json({
    status: "success",
    results: count,
    content: products,
  });
});

export const getAllDealsManufacturer = catchAsync(
  async (req: Request, res: Response) => {
    const manufacturers = await Deal.aggregate([
      {
        $group: { _id: "$manufacturer", count: { $sum: 1 } },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
          name: 1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      content: manufacturers,
    });
  }
);
export const getAllDealsCategory = catchAsync(
  async (req: Request, res: Response) => {
    const manufacturers = await Deal.aggregate([
      {
        $match: { status: { $ne: "INACTIVE" } },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: "$category._id",
          nameAr: "$category.nameAr",
          nameEn: "$category.nameEn",
          status: "$category.status",
          icon: "$category.icon",
          count: "$count",
        },
      },
      // {
      //   $group: { _id: "$manufacturer", count: { $sum: 1 } },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     name: "$_id",
      //     count: 1,
      //   },
      // },
      // {
      //   $sort: {
      //     count: -1,
      //     name: 1,
      //   },
      // },
    ]);
    res.status(200).json({
      status: "success",
      content: manufacturers,
    });
  }
);
