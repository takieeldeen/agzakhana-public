import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Nationality from "../models/nationalityModel";

export const getAllNationalities = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await Nationality.find({});
    res.status(200).json({
      status: "success",
      results: content?.length,
      content,
    });
  }
);
