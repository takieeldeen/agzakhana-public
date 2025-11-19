import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import Branch from "../../models/dashboard/branchModel";
import { clientLocale } from "../../app";
import mongoose from "mongoose";

export const createBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      nameAr,
      nameEn,
      address,
      phoneNumber,
      manager,
      startHour,
      endHour,
    } = req.body;
    const newBranch = {
      nameAr,
      nameEn,
      address,
      phoneNumber,

      manager,
      startHour,
      endHour,
      location: {
        type: "Point",
        coordinates: [address?.lat, address?.lng],
      },
    };
    const branch = await Branch.create(newBranch);
    res.status(201).json({
      status: "success",
      content: branch,
    });
  }
);

export const getAllBranches = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req?.query;
    const pageNum = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.size ? +req.query.size : 9;

    const filterObj: any = {};
    let sortObj: any;
    if (req.query.status) filterObj.status = status;
    if (req.query.name && clientLocale === "ar") {
      filterObj.nameAr = { $regex: `.*${req.query.name}.*` };
    } else if (req.query.name && clientLocale === "en") {
      filterObj.nameEn = { $regex: `.*${req.query.name}.*` };
    }
    if (req.query.manager) {
      filterObj.manager = new mongoose.Types.ObjectId(
        req.query.manager as string
      );
    }
    if (req.query.sort && req.query.sort === "name") {
      sortObj = {
        [clientLocale === "ar" ? "nameAr" : "nameEn"]:
          req.query.dir === "desc" ? -1 : 1,
      };
    } else if (req.query.sort) {
      sortObj = {
        [req.query.sort as string]: req.query.dir === "desc" ? -1 : 1,
      };
    }
    console.log(filterObj);
    const content = await Branch.aggregate([
      {
        $match: filterObj,
      },
      {
        $project: {
          nameAr: 1,
          nameEn: 1,
          status: 1,
          address: 1,
          phoneNumber: 1,
          startHour: 1,
          endHour: 1,
          manager: 1,
          createdAt: 1,
        },
      },
      {
        $lookup: {
          from: "dasboardusers",
          localField: "manager",
          foreignField: "_id",
          as: "manager",
          pipeline: [
            {
              $project: {
                nameAr: 1,
                nameEn: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$manager",
      },
      { $sort: sortObj ?? { createdAt: req.query?.dir === "asc" ? 1 : -1 } },
      {
        $facet: {
          results: [{ $count: "count" }],
          roles: [{ $skip: (pageNum - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      content: content?.[0].roles,
      results: content?.[0].results?.[0]?.count ?? 0,
    });
  }
);

export const activateBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { branchId } = req.params;

    const branch = await Branch.findByIdAndUpdate(
      branchId,
      { status: "ACTIVE" },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      content: branch,
    });
  }
);
export const deactivateBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { branchId } = req.params;

    const branch = await Branch.findByIdAndUpdate(
      branchId,
      { status: "INACTIVE" },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      content: branch,
    });
  }
);

export const deleteBranch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { branchId } = req.params;
    await Branch.findOneAndDelete({ _id: branchId });
    res.status(204).json({
      status: "success",
    });
  }
);

export const getAllActiveBranches = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await Branch.find({ status: "ACTIVE" });
    res.status(200).json({
      status: "success",
      results: content?.length,
      content,
    });
  }
);
