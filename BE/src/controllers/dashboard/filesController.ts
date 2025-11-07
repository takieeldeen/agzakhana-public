import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createClient } from "@supabase/supabase-js";
import { FileType } from "../../types/files";
import FileModel from "../../models/dashboard/filesModel";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req?.file;
    const bucketName = `${file?.originalname}-${Date.now()}`;
    const name = `${file?.originalname}`;
    const fileInfo: Partial<FileType> = {
      bucketName,
      name,
      size: file?.size ?? 0,
      type: file?.mimetype ?? "",
    };
    let content;
    if (file) {
      await supabase.storage
        .from("dashboard-storage")
        .upload(bucketName, file.buffer, {
          upsert: true,
          contentType: file?.mimetype,
        });
      const { data } = supabase.storage
        .from("dashboard-storage")
        .getPublicUrl(bucketName);
      fileInfo.url = data?.publicUrl;
      content = await FileModel.create(fileInfo);
    }
    if (content) {
      res.status(200).json({
        status: "success",
        content,
      });
    } else {
      res.status(400).json({
        status: "fail",
      });
    }
  }
);
export const removeFile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fileId } = req.params;
    const file = await FileModel.findById(fileId);
    if (file) {
      await supabase.storage
        .from("dashboard-storage")
        .remove([file.bucketName]);
    }
    if (file) {
      res.status(204).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
      });
    }
  }
);
