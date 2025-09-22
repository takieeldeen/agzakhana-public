import { NextFunction, Response } from "express";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import Cart from "../models/cartModel";
import mongoose from "mongoose";
import { DealType } from "../types/deals";
// Helper Constants ///////////////////////////////////////
export const PRODUCT_VISIBLE_FIELDS =
  "_id nameAr nameEn concentration price beforeDiscount qty total availableQty imageUrl descriptionAr descriptionEn maxQty";
// Delete /////////////////////////////////////////////////
export const removeFromCart = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const test = new Promise((res) => {
      setTimeout(() => {
        res({ name: "test" });
      }, 3000);
    });
    await test;
    const { cartItemId } = req.params;
    const userId = req?.user?._id;
    const newCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { cart: { _id: new mongoose.Types.ObjectId(cartItemId) } } },
      { new: true }
    ).populate([
      {
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      },
      {
        path: "cart.deal",
        select: PRODUCT_VISIBLE_FIELDS,
      },
    ]);
    res.status(200).json({
      status: "success",
      content: newCart,
      results: newCart?.cart?.length,
    });
  }
);

export const clearCart = catchAsync(
  async (req: ProtectedRequest, res: Response) => {
    const userId = req?.user?._id;
    const newCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { cart: [] } },
      { new: true }
    );
    res.status(200).json({
      status: "succcess",
      content: newCart,
      results: 0,
    });
  }
);

// Read /////////////////////////////////////////////////
export const getCart = catchAsync(
  async (req: ProtectedRequest, res: Response) => {
    const cart = await Cart.findOne({ userId: req?.user?._id }).populate([
      {
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      },
      {
        path: "cart.deal",
        select: PRODUCT_VISIBLE_FIELDS,
      },
    ]);
    res.status(200).json({
      status: "success",
      results: cart?.cart?.length,
      content: cart,
    });
  }
);

// Create /////////////////////////////////////////////////
export const addToCart = catchAsync(
  async (req: ProtectedRequest, res: Response) => {
    const userId = req?.user?._id;
    const currentCart = await Cart.findOne({ userId });
    const { productId, qty, offerId } = req?.body;
    const cartItem = {
      product: productId
        ? new mongoose.Types.ObjectId(productId as string)
        : null,
      deal: offerId ? new mongoose.Types.ObjectId(offerId as string) : null,

      qty: +(qty ?? 1),
    };
    let cart;
    if (!currentCart) {
      const newCart = {
        userId: new mongoose.Types.ObjectId(userId),
        cart: [cartItem],
      };
      cart = await Cart.create(newCart);
      cart = await cart.populate({
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      });
    } else {
      cart = await Cart.findByIdAndUpdate(
        currentCart?._id,
        {
          $push: { cart: cartItem },
        },
        { new: true }
      ).populate([
        {
          path: "cart.product",
          select: PRODUCT_VISIBLE_FIELDS,
        },
        {
          path: "cart.deal",
          select: PRODUCT_VISIBLE_FIELDS,
        },
      ]);
    }
    res.status(200).json({
      status: "success",
      results: cart?.cart?.length,
      content: cart,
    });
  }
);
// Update /////////////////////////////////////////////////
export const updateCartItem = catchAsync(
  async (req: ProtectedRequest, res: Response) => {
    const userId = req?.user?._id;
    const { cartItemId } = req?.params;
    const { qty } = req?.body;
    const cart = await Cart.findOneAndUpdate(
      { userId, "cart._id": cartItemId },
      {
        $set: {
          "cart.$.qty": +(qty ?? 0),
        },
      },
      { new: true }
    ).populate([
      {
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      },
      {
        path: "cart.deal",
        select: PRODUCT_VISIBLE_FIELDS,
      },
    ]);
    console.log(cart);
    res.status(200).json({
      status: "success",
      content: cart,
      results: cart?.cart?.length,
    });
  }
);

export const getCartDetails = catchAsync(
  async (req: ProtectedRequest, res: Response) => {
    const cart = await Cart.findOne({ userId: req?.user?._id }).populate([
      {
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      },
      {
        path: "cart.deal",
        select: PRODUCT_VISIBLE_FIELDS,
      },
    ]);
    const subtotal = cart?.cart?.reduce(
      (acc, cur: any) =>
        cur?.deal
          ? acc + (cur?.deal?.price ?? 0) * (cur?.qty ?? 0)
          : acc + (cur?.product?.price ?? 0) * (cur?.qty ?? 0),
      0
    );
    const delivery = Math.min(100, 0.1 * (subtotal ?? 0));
    const vat = 0.14 * (subtotal ?? 0);
    const total = (subtotal ?? 0) + delivery + vat;
    const orderSummary = {
      subtotal,
      delivery,
      vat,
      total,
    };

    res.status(200).json({
      status: "success",
      results: cart?.cart?.length,
      content: { cart: cart?.cart, orderSummary },
    });
  }
);
