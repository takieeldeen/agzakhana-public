import RHFFileUpload from "@/components/rhf-upload-file/rhf-upload-file";
import { useTranslations } from "next-intl";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
} from "./new-edit-form";
import { Dispatch, SetStateAction, useCallback } from "react";
import axios, { endpoints } from "@/app/dashboard-api/axios";

export default function UserDocumentInfoForm() {
  const t = useTranslations();
  const uploadFn = useCallback(
    async (
      file: File,
      setFileProgresses: Dispatch<SetStateAction<Record<string, number>>>
    ) => {
      const URL = endpoints.common.uploadFile;
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.lengthComputable) {
            setFileProgresses((prev) => ({ ...prev, [file.name]: 0 }));
            return;
          }
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total ?? 1)
          );
          setFileProgresses((prev) => ({
            ...prev,
            [file.name]: percent > 95 ? 95 : percent,
          }));
        },
      });
      const fileData = {
        _id: res?.data?.content?._id,
        name: res?.data?.content?.name,
        type: res?.data?.content?.type,
        size: res?.data?.content?.size,
        url: res?.data?.content?.url,
      };
      return fileData;
    },
    []
  );
  const deleteFn = useCallback(async (file: any) => {
    const URL = endpoints.common.deleteFile(file?._id);
    await axios.delete(URL);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <RHFFileUpload
        name="files"
        mandatoryField
        files={[]}
        title={t("USERS_MANAGEMENT.UPLOAD_TITLE")}
        subtitle={t("USERS_MANAGEMENT.UPLOAD_SUBTITLE")}
        placeholder={t("USERS_MANAGEMENT.UPLOAD_FILE_IMG")}
        className="dark:bg-dark-background"
        maxSize={MAX_FILE_SIZE}
        maxFiles={MAX_FILE_COUNT}
        silenceErrors
        supportedFiles={ACCEPTED_FILE_TYPES}
        getFileUrl={(file) => {
          return file?.url;
        }}
        getFileType={(file) => {
          return file?.type;
        }}
        getFileSize={(file) => {
          return file?.size;
        }}
        uploadFn={uploadFn}
        removeFn={deleteFn}
      />
    </div>
  );
}
