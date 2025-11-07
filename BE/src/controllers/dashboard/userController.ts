import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { DashboardUserType, UserType } from "../../types/users";
import { createHash, randomBytes } from "crypto";
import { sendMail } from "../../services/emailServices";
import { generateMailTemplate } from "../../templates/mails";
import { clientLocale } from "../../app";
import DashboardUser from "../../models/dashboard/userModel";
import { createClient } from "@supabase/supabase-js";
import mongoose from "mongoose";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      nameAr,
      nameEn,
      email,
      gender,
      nationalId,
      birthDate,
      joiningDate,
      nationality,
      city,
      branch,
      phoneNumber,
      permissions,
      lat,
      lng,
      displayName,
      imageUrl,
      googleMapUrl,
      roles,
    } = req.body;
    const newUser: Partial<DashboardUserType> = {
      nameAr,
      nameEn,
      email,
      gender,
      nationalId,
      birthDate,
      joiningDate,
      nationality,
      city,
      branch,
      phoneNumber,
      location: {
        type: "Point",
        coordinates: [lat, lng],
      },
      address: {
        displayName: displayName,
        lat: lat,
        lng: lng,
      },
      imageUrl,
      permissions,
      password: "test",
      passwordConfirmation: "test",
      googleMapUrl,
      roles: roles
        ?.split(",")
        ?.map((role: string) => new mongoose.Types.ObjectId(role)),
    };
    if (req?.file && typeof req?.file !== "string") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const imageName = `${req?.body?.email?.split("@")?.[0]}-${
        req?.body?.nationalId
      }`;
      await supabase.storage
        .from("Dashboard-profile-pics")
        .upload(imageName, req?.file?.buffer, {
          upsert: true,
          contentType: req?.file?.mimetype,
        });
      const { data } = supabase.storage
        .from("Dashboard-profile-pics")
        .getPublicUrl(imageName);
      newUser.imageUrl = data?.publicUrl;
    }

    const plainToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(plainToken).digest("hex");
    newUser.activationToken = hashedToken;

    await DashboardUser.create(newUser);
    await sendMail({
      to: [newUser.email!],
      subject: "Agzakhana | Welcome To Agzakhana",
      html: generateMailTemplate({
        title: req.t("MAILS.TITLE.SIGN_UP", { lng: clientLocale }),
        content: req.t("MAILS.CONTENT.SIGN_UP", { lng: clientLocale }),
        user: newUser?.email!,
        actionTitle: req.t("MAILS.ACTION_TITLE.SIGN_UP", {
          lng: clientLocale,
        }),
        actionSubtitle: req.t("MAILS.ACTION_SUBTITLE.SIGN_UP", {
          lng: clientLocale,
        }),
        actionLink: `${process.env.CLIENT_URL}/sign-up?token=${plainToken}`,
      }),
    });
    res.status(201).json({
      status: "success",
    });
  }
);
export const getAllUsers = catchAsync(
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
    const content = await DashboardUser.aggregate([
      {
        $match: filterObj,
      },

      {
        $lookup: {
          from: "roles",
          as: "roles",
          foreignField: "_id",
          localField: "roles",
          pipeline: [
            {
              $project: {
                _id: 1,
                nameAr: 1,
                nameEn: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          nameAr: 1,
          nameEn: 1,
          email: 1,
          status: 1,
          imageUrl: 1,
          roles: 1,
          joiningDate: 1,
          branch: 1,
          gender: 1,
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
    res.status(200).json({
      status: "success",
      content: content?.[0].roles,
      results: content?.[0].results?.[0]?.count ?? 0,
    });
  }
);
export const getUserDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req?.params;
    const user = await DashboardUser.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          _id: 1,
          imageUrl: 1,
          nameAr: 1,
          nameEn: 1,
          email: 1,
          status: 1,
          roles: 1,
          branch: 1,
          location: "$address",
          phoneNumber: 1,
          updatedAt: 1,
        },
      },
      {
        $facet: {
          user: [
            {
              $lookup: {
                from: "roles",
                foreignField: "_id",
                localField: "roles",
                as: "roles",
                pipeline: [{ $project: { nameAr: 1, nameEn: 1, status: 1 } }],
              },
            },
          ],
          permissionGroups: [
            {
              $lookup: {
                from: "roles",
                as: "roles",
                localField: "roles",
                foreignField: "_id",
              },
            },
            {
              $project: {
                _id: 0,
                permissions: {
                  $reduce: {
                    input: "$roles.permissions",
                    initialValue: [],
                    in: { $setUnion: ["$$value", "$$this"] },
                  },
                },
              },
            },
            {
              $lookup: {
                localField: "permissions",
                foreignField: "_id",
                from: "permissions",
                as: "permissions",
              },
            },
            {
              $unwind: "$permissions",
            },
            {
              $lookup: {
                localField: "permissions.permissionGroup",
                foreignField: "_id",
                from: "permissiongroups",
                as: "permissions.permissionGroup",
              },
            },
            {
              $unwind: "$permissions.permissionGroup",
            },
            {
              $group: {
                _id: "$permissions.permissionGroup._id",
                nameAr: { $first: "$permissions.permissionGroup.nameAr" },
                nameEn: { $first: "$permissions.permissionGroup.nameEn" },
                permissions: {
                  $push: {
                    _id: "$permissions._id",
                    nameAr: "$permissions.nameAr",
                    nameEn: "$permissions.nameEn",
                  },
                },
              },
            },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ["$user", 0] },
              { permissionGroups: "$permissionGroups" },
            ],
          },
        },
      },
    ]);
    const content = user?.[0] ?? null;

    if (!content) {
      res.status(404).json({
        status: "fail",
        message: "not-found",
        content: null,
      });
    } else {
      res.status(200).json({
        status: "success",
        content,
      });
    }
  }
);
export const deleteUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, roleId } = req.params;

    const updatedUser = await DashboardUser.findByIdAndUpdate(userId, {
      $pull: { roles: { $eq: roleId } },
    }).populate({
      path: "roles",
      select: ["nameAr", "nameEn", "status"],
    });
    res.status(200).json({
      status: "success",
      content: updatedUser,
    });
  }
);
