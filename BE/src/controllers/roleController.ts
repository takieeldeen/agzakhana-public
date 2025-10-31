import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { Role } from "../models/rolesModel";
import { clientLocale } from "../app";
import mongoose from "mongoose";

export const getAllRoles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req?.query;
    const pageNum = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.size ? +req.query.size : 9;

    const filterObj: any = {};
    let sortObj: any;
    if (req.query.status) filterObj.status = status;
    console.log(req.query);
    if (req.query.name && clientLocale === "ar") {
      filterObj.nameAr = { $regex: `.*${req.query.name}.*` };
    } else if (req.query.name && clientLocale === "en") {
      filterObj.nameEn = { $regex: `.*${req.query.name}.*` };
    }
    if (req.query.permissions) {
      filterObj.permissions = {
        $in: [new mongoose.Types.ObjectId(req.query.permissions as string)],
      };
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
    const content = await Role.aggregate([
      {
        $match: filterObj,
      },
      {
        $project: {
          nameAr: 1,
          nameEn: 1,
          descriptionAr: 1,
          descriptionEn: 1,
          status: 1,
          permissions: 1,
          createdAt: 1,
          permissionsCount: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: { $size: "$permissions" },
              else: 0,
            },
          },
          usersCount: {
            $cond: {
              if: { $isArray: "$permissions" },
              then: 0,
              else: 0,
            },
          },
        },
      },
      { $sort: sortObj ?? { createdAt: -1 } },
      {
        $facet: {
          results: [{ $count: "count" }],
          roles: [{ $skip: (pageNum - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
    console.log(content);
    res.status(200).json({
      status: "success",
      content: content?.[0].roles,
      results: content?.[0].results?.[0]?.count ?? 0,
    });
  }
);

export const activateRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roleId } = req.params;

    const role = await Role.findByIdAndUpdate(
      roleId,
      { status: "ACTIVE" },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      content: role,
    });
  }
);
export const deactivateRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roleId } = req.params;

    const role = await Role.findByIdAndUpdate(
      roleId,
      { status: "INACTIVE" },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      content: role,
    });
  }
);
export const createRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nameAr, nameEn, descriptionAr, descriptionEn, permissions } =
      req.body;
    const newRole = {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      permissions,
    };
    const role = await Role.create(newRole);
    res.status(201).json({
      status: "success",
      content: role,
    });
  }
);
export const editRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id, nameAr, nameEn, descriptionAr, descriptionEn, permissions } =
      req.body;
    const updatedData = {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      permissions,
    };
    const role = await Role.findByIdAndUpdate(_id, updatedData, { new: true });
    res.status(200).json({
      status: "success",
      content: role,
    });
  }
);
export const getRoleDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { roleId } = req?.params;
    const role = await Role.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(roleId) } },

      {
        $facet: {
          role: [
            {
              $project: {
                _id: 1,
                nameAr: 1,
                nameEn: 1,
                descriptionAr: 1,
                descriptionEn: 1,
                permissionsCount: { $size: "$permissions" },
                status: 1,
                updatedAt: 1,
              },
            },
            {
              $addFields: {
                usersCount: 0,
                // permissionsCount: { $size: "$permissions" },
              },
            },
          ],
          permissionGroups: [
            {
              $lookup: {
                from: "permissions",
                foreignField: "_id",
                localField: "permissions",
                as: "permissions",
              },
            },
            { $unwind: "$permissions" },

            {
              $lookup: {
                from: "permissiongroups",
                localField: "permissions.permissionGroup",
                foreignField: "_id",
                as: "permissionGroup",
              },
            },
            { $unwind: "$permissionGroup" },
            {
              $group: {
                _id: "$permissionGroup._id",
                count: { $sum: 1 },
                nameAr: { $first: "$permissionGroup.nameAr" },
                nameEn: { $first: "$permissionGroup.nameEn" },
                permissions: {
                  $push: {
                    _id: "$permissions._id",
                    nameAr: "$permissions.nameAr",
                    nameEn: "$permissions.nameEn",
                    permissionGroup: "$permissions.permissionGroup",
                  },
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          role: { $arrayElemAt: ["$role", 0] },
          permissionGroups: "$permissionGroups",
        },
      },
    ]);
    console.log(role?.[0]?.role);
    const content = {
      ...(role?.[0]?.role ?? {}),
      permissionGroups: role?.[0]?.permissionGroups,
    };

    res.status(200).json({
      status: "success",
      content,
    });
  }
);
