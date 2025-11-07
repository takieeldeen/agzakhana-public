import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { RefObject, useState } from "react";
import { FileUploadErrors } from "./upload-file";
import { FormMessage } from "../ui/form";

interface FileDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
  placeholder?: string;
  maxSize: number;
  errors: FileUploadErrors | null;
  silenceErrors?: boolean;
  rhf?: boolean;
  acceptedFiles?: string[];
}

export function FileDropzone({
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  placeholder,
  maxSize = 4,
  errors,
  silenceErrors,
  rhf = false,
  acceptedFiles,
}: FileDropzoneProps) {
  const [fileDragged, setFileDragged] = useState<boolean>(false);
  const t = useTranslations();
  const HAS_ERRORS = !!errors && Object.values(errors).length > 0;
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-48",
          fileDragged && "border-emerald-600 bg-emerald-600",
          HAS_ERRORS && !silenceErrors && "border-rose-700"
        )}
        onClick={handleBoxClick}
        onDragLeave={() => {
          setFileDragged(false);
        }}
        onDragOver={(e) => {
          handleDragOver(e);
          setFileDragged(true);
        }}
        onDrop={(e) => {
          handleDrop(e);
          setFileDragged(false);
        }}
      >
        {fileDragged && (
          <div className="flex flex-row gap-2">
            <Icon
              icon="fluent:arrow-reply-32-filled"
              className="text-4xl text-white rotate-y-180 rtl:rotate-y-0"
            />
            <p className="text-white text-lg">{t("COMMON.DROP_HERE")}</p>
            <Icon
              icon="fluent:arrow-reply-32-filled"
              className="text-4xl text-white rtl:rotate-y-180"
            />
          </div>
        )}
        {!fileDragged && (
          <>
            <div className="mb-2 bg-muted rounded-full p-3 dark:bg-dark-card">
              <Upload className="h-5 w-5 text-muted-foreground " />
            </div>
            {!!placeholder && (
              <p className="text-sm font-medium text-foreground">
                {placeholder}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {t("COMMON.OR")}{" "}
              <label
                htmlFor="fileUpload"
                className="text-primary hover:text-primary/90 font-medium cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
              >
                {t("COMMON.BROWSE_FILES")}
              </label>{" "}
              {isFinite(maxSize)
                ? `${maxSize / (1024 * 1024)} ${t("COMMON.MB")} ${t(
                    "COMMON.MAX"
                  )}`
                : t("COMMON.NO_MAX_FILE_SIZE")}
            </p>
          </>
        )}
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept={
            Array.isArray(acceptedFiles) && acceptedFiles?.length > 0
              ? acceptedFiles?.join(",")
              : "*"
          }
          onChange={async (e) => await handleFileSelect(e.target.files)}
        />
      </div>
      {!rhf && HAS_ERRORS && !silenceErrors && (
        <p className="text-sm text-rose-800">{Object.values(errors)?.[0]}</p>
      )}
      {rhf && (
        <div className="min-h-4 ">
          <FormMessage className={cn("rtl:text-right")} />
        </div>
      )}
    </div>
  );
}
