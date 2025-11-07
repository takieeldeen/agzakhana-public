import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import City from "../models/cityModel";

export const getAllCities = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await City.find({});
    res.status(200).json({
      status: "success",
      results: content?.length,
      content,
    });
  }
);
