import { NextFunction, Request, Response } from "express";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import Comment from "../models/commentModel";
import { AppError } from "../utils/errors";
import mongoose from "mongoose";
import { t } from "i18next";
import { decode } from "jsonwebtoken";
import User from "../models/usersModel";

export const getAllComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req?.cookies;
    const userId = (decode(token) as any)?.id;
    const currentUser = await User.findById(userId);
    const { productId } = req.params;
    const comments = await Comment.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          as: "user",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            {
              $project: {
                email: 1,
                name: 1,
                imageUrl: 1,
                isActive: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: { "user.isActive": true },
      },
      {
        $project: {
          "user.isActive": 0,
        },
      },
      {
        $facet: {
          comments: [
            {
              $addFields: {
                editable: {
                  $expr: {
                    $eq: ["$userId", new mongoose.Types.ObjectId(userId)],
                  },
                },
              },
            },
          ],
          reviewsCount: [{ $count: "count" }],
          overAllRating: [
            {
              $group: { _id: "$productId", avg: { $avg: "$rate" } },
            },
          ],
          existingRates: [
            { $group: { _id: "$rate", count: { $sum: 1 } } },
            {
              $project: { _id: 0, rate: "$_id", count: 1 },
            },
          ],
          allRates: [
            {
              $limit: 1,
            },
            { $project: { rate: [1, 2, 3, 4, 5] } },
            { $unwind: "$rate" },
            { $project: { _id: 0, rate: 1, count: { $literal: 0 } } },
          ],
        },
      },

      {
        $project: {
          comments: 1,
          reviewsCount: 1,
          overAllRating: 1,
          mergedRates: { $concatArrays: ["$allRates", "$existingRates"] },
        },
      },
      { $unwind: "$mergedRates" },
      {
        $group: {
          _id: {
            comments: "$comments",
            reviewsCount: "$reviewsCount",
            overAllRating: "$overAllRating",
            rate: "$mergedRates.rate",
          },
          count: { $sum: "$mergedRates.count" },
        },
      },
      {
        $group: {
          _id: {
            comments: "$_id.comments",
            reviewsCount: "$_id.reviewsCount",
            overAllRating: "$_id.overAllRating",
          },
          mergedRates: {
            $push: {
              k: { $toString: "$_id.rate" },
              v: {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$count",
                          { $arrayElemAt: ["$_id.reviewsCount.count", 0] },
                        ],
                      },
                      100,
                    ],
                  },
                  1,
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          comments: "$_id.comments",
          reviewCount: { $arrayElemAt: ["$_id.reviewsCount.count", 0] },
          overAllRating: {
            $round: [{ $arrayElemAt: ["$_id.overAllRating.avg", 0] }, 1],
          },
          reviewsFrequency: { $arrayToObject: "$mergedRates" },
        },
      },
      {
        $addFields: {
          canReview: {
            $not: {
              $anyElementTrue: {
                $map: {
                  input: "$comments",
                  as: "c",
                  in: {
                    $eq: ["$$c.userId", new mongoose.Types.ObjectId(userId)],
                  },
                },
              },
            },
          },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      content: comments?.[0] ?? {},
      results: comments.length,
    });
  }
);

export const createComment = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { comment, rate } = req.body;
    const newComment = {
      productId,
      comment,
      rate,
      userId: req?.user?._id,
    };
    const previousComments = await Comment.findOne({
      userId: req?.user?._id,
      productId,
    });
    if (previousComments)
      return next(new AppError(500, "User already reviewed this product"));
    const createdComment = await Comment.create(newComment);
    res.status(201).json({
      status: "success",
      content: createdComment,
    });
  }
);

export const deleteComment = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      userId: req?.user?._id,
    });
    if (!comment)
      return next(new AppError(500, "No Comment found for this user."));
    res.status(204).json({
      status: "success",
    });
  }
);

export const updateComment = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { comment, rate } = req.body;
    if (!comment && !rate)
      return next(
        new AppError(400, "Please provide comment or rate to update.")
      );
    const newData = { comment, rate, updatedAt: new Date() };
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, userId: req?.user?._id },
      newData,
      {
        new: true,
      }
    );
    if (!updatedComment)
      return next(new AppError(500, "No Comment found with that ID"));

    res.status(200).json({
      status: "success",
      content: updatedComment,
    });
  }
);
