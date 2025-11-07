import mongoose, { Schema } from "mongoose";
import { FileType } from "../../types/files";

const filesSchema = new Schema<FileType>({
  name: String,
  bucketName: String,
  size: Number,
  type: String,
  url: String,
});

const FileModel = mongoose.model<FileType>("File", filesSchema);
export default FileModel;
