import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Category from "../models/categoriesModel";
import Product from "../models/productsModel";
import { PipelineStage } from "mongoose";

export const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const { status } = req.query;
    const pipeline: PipelineStage[] = [
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
          _id: "$_id",
          nameAr: "$category.nameAr",
          nameEn: "$category.nameEn",
          count: "$count",
          icon: "$category.icon",
          status: "$category.status",
        },
      },
      {
        $match: { count: { $gt: 0 } },
      },
      {
        $sort: { count: -1 },
      },
    ];
    if (status)
      pipeline.push({
        $match: {
          status: status,
        },
      });
    const categories = await Product.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      content: categories ?? [],
      results: categories?.length ?? 0,
    });
  }
);
