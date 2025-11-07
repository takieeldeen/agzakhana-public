import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const getAllActiveBranches = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const content: any[] = [];
    res.status(200).json({
      status: "success",
      results: content?.length,
      content,
    });
  }
);
