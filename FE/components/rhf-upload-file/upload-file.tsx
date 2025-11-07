"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { FileDropzone } from "./file-drop-zone";
import { FileList } from "./file-list";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
// import { Form } from "./form";

export type FileUploadErrors = {
  typeError?: string;
  sizeError?: string;
  countError?: string;
  requiredError?: string;
};

export type FileUploadProps = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  slotProps?: {
    titleProps: ComponentProps<"p">;
    subtitleProps: ComponentProps<"p">;
    placeholderProp: ComponentProps<"p">;
  };
  maxFiles?: number;
  maxSize?: number;
  supportedFiles?: string[];
  silenceErrors?: boolean;
  onFilesChange?: (files: File[], reason: "add" | "remove", file: File) => void;
  files?: File[];
  mandatoryField?: boolean;
  getFileUrl?: (file: any) => string;
  getFileType?: (file: any) => string;
  getFileSize?: (file: any) => number;
  uploadFn?: (
    file: File,
    setFileProgresses: Dispatch<SetStateAction<Record<string, number>>>
  ) => any;
  removeFn?: (file: any) => any;
  rhf?: boolean;
} & ComponentProps<"div">;

export default function FileUpload({
  title,
  subtitle,
  placeholder,
  slotProps,
  maxFiles = Infinity,
  maxSize = Infinity,
  supportedFiles,
  silenceErrors = false,
  onFilesChange,
  files = [],
  mandatoryField,
  getFileUrl,
  getFileSize,
  getFileType,
  rhf = false,
  uploadFn,
  removeFn,
  ...other
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State Management ///////////////////////////////////////////////////////////
  const [errors, setErrors] = useState<FileUploadErrors | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(files);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
  );
  const t = useTranslations();
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setErrors({});
    const HAS_MAX_COUNT_ERROR = uploadedFiles.length >= maxFiles;
    const HAS_MAX_SIZE_ERROR = newFiles[0].size > maxSize;
    const HAS_TYPE_ERROR =
      Array.isArray(supportedFiles) && supportedFiles?.length > 0
        ? !supportedFiles.includes(newFiles[0].type)
        : false;

    if (HAS_MAX_COUNT_ERROR && !silenceErrors) {
      setErrors((prev) => ({
        ...prev,
        countError: t("VALIDATIONS.MAX_FILE_COUNT_ERROR"),
      }));
      return;
    }
    if (HAS_MAX_SIZE_ERROR && !silenceErrors) {
      setErrors((prev) => ({
        ...prev,
        sizeError: t("VALIDATIONS.MAX_FILE_SIZE_ERROR"),
      }));
      return;
    }
    if (HAS_TYPE_ERROR && !silenceErrors) {
      setErrors((prev) => ({
        ...prev,
        typeError: t("VALIDATIONS.FILE_TYPE_ERROR"),
      }));
      return;
    }
    let newFile = newFiles[0];
    if (uploadFn) {
      const previousFiles = [...uploadedFiles];
      setUploadedFiles((prev) => [newFile, ...prev]);
      const res = await uploadFn(newFile, setFileProgresses);
      if (res) {
        newFile = res;
        setUploadedFiles([newFile, ...previousFiles]);
      }
    } else {
      setUploadedFiles((prev) => [newFile, ...prev]);
      newFiles.forEach((file) => {
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: 100,
        }));
      });
    }
    onFilesChange?.([newFile, ...uploadedFiles], "add", newFile);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    await handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = async (filename: string) => {
    const totalFiles = uploadedFiles.filter((file) => file.name !== filename);
    const removedFile = uploadedFiles.find((file) => file.name === filename);
    setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
    onFilesChange?.(totalFiles, "remove", removedFile!);

    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
    if (removeFn) await removeFn(removedFile);
  };

  return (
    <Card
      {...other}
      className={cn(
        "w-full mx-auto max-w-lg bg-background dark:bg-dark-background rounded-lg p-0 shadow-md",
        other?.className
      )}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="p-0 pb-4">
          <div className="flex justify-between items-start">
            {(!!title || !!subtitle) && (
              <div>
                {!!title && (
                  <h2
                    {...(slotProps?.titleProps ?? {})}
                    className={cn(
                      "text-lg font-medium text-foreground",
                      slotProps?.titleProps?.className
                    )}
                  >
                    {title}
                    {mandatoryField && (
                      <span className="font-bold text-red-700">*</span>
                    )}
                  </h2>
                )}
                {!!subtitle && (
                  <p
                    {...(slotProps?.subtitleProps ?? {})}
                    className={cn(
                      "text-sm text-muted-foreground mt-1",
                      slotProps?.titleProps?.className
                    )}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* <Form /> */}
        <FileDropzone
          placeholder={placeholder}
          fileInputRef={fileInputRef}
          handleBoxClick={handleBoxClick}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
          maxSize={maxSize}
          errors={errors}
          silenceErrors={silenceErrors}
          rhf={rhf}
          acceptedFiles={supportedFiles}
        />
        <FileList
          getFileUrl={getFileUrl}
          getFileType={getFileType}
          getFileSize={getFileSize}
          uploadedFiles={uploadedFiles}
          fileProgresses={fileProgresses}
          removeFile={removeFile}
        />
      </CardContent>
    </Card>
  );
}
