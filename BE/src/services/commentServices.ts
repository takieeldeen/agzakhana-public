import mongoose from "mongoose";
import Comment from "../models/commentModel";
import Product from "../models/productsModel";

export async function recalculateRating(
  productId: string | mongoose.Types.ObjectId
) {
  const content = await Comment.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$productId",
        rating: { $avg: "$rate" },
        reviewers: { $sum: 1 },
      },
    },
  ]);
  await Product.findByIdAndUpdate(productId, {
    rating: +(content?.[0]?.rating?.toFixed(2) ?? 0),
    reviewers: content?.[0]?.reviewers,
  });
}
