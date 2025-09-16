import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productsModel";
import mongoose from "mongoose";
import Comment from "../models/commentModel";

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

export const getSimilarProducts = catchAsync(
  async (req: Request, res: Response, next) => {
    const { productId } = req.params;
    const currentProduct = await Product.findById(productId);
    const priceRange = 0.2;
    const products = await Product.aggregate([
      {
        $match: { _id: { $ne: new mongoose.Types.ObjectId(productId) } },
      },
      {
        $addFields: {
          score: {
            $sum: [
              {
                $cond: [{ $eq: ["$category", currentProduct?.category] }, 3, 0],
              },
              {
                $cond: [
                  {
                    $and: [
                      {
                        price: {
                          $gte: [
                            "$price",
                            (currentProduct?.price ?? 0) * (1 - priceRange),
                          ],
                        },
                      },
                      {
                        price: {
                          $lte: [
                            "$price",
                            (currentProduct?.price ?? 0) * (1 + priceRange),
                          ],
                        },
                      },
                    ],
                  },
                  2,
                  0,
                ],
              },
              {
                $cond: [
                  { $eq: ["$manufacturer", currentProduct?.manufacturer] },
                  1,
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    res.status(200).json({
      status: "success",
      content: products,
      results: products.length,
    });
  }
);

export const getPopularProducts = catchAsync(
  async (req: Request, res: Response) => {
    console.log("test");
    const products = await Comment.aggregate([
      { $match: { productId: { $ne: null } } },
      {
        $group: {
          _id: "$productId",
          popularity: { $avg: "$rate" },
        },
      },

      { $sort: { popularity: -1 } },
      {
        $project: { _id: 1 },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $limit: 10,
      },
    ]);
    res.status(200).json({
      status: " success",
      results: products?.length,
      content: products,
    });
  }
);
