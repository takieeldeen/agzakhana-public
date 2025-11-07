import { cn } from "@/lib/utils";
import { UploadedFileItem } from "./file-item";

interface UploadedFileListProps {
  uploadedFiles: File[];
  fileProgresses: Record<string, number>;
  removeFile: (filename: string) => void;
  getFileUrl?: (file: any) => string;
  getFileType?: (file: any) => string;
  getFileSize?: (file: any) => number;
}

export function FileList({
  uploadedFiles,
  fileProgresses,
  removeFile,
  getFileUrl,
  getFileSize,
  getFileType,
}: UploadedFileListProps) {
  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        " pb-5 space-y-3 mt-4 max-h-48 pl-2 overflow-y-auto overflow-x-hidden"
      )}
    >
      {uploadedFiles.map((file, index) => (
        <UploadedFileItem
          key={file.name + index}
          file={file}
          progress={fileProgresses[file.name] || 0}
          onRemove={removeFile}
          getFileUrl={getFileUrl}
          getFileType={getFileType}
          getFileSize={getFileSize}
        />
      ))}
    </div>
  );
}
