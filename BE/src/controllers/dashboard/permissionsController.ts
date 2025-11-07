import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import Permission from "../../models/dashboard/permissionsModel";

export const getAllPermissions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const permissions = await Permission.find();
    res.status(200).json({
      status: "success",
      content: permissions ?? [],
      results: permissions?.length ?? 0,
    });
  }
);
