import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";

interface UploadedFileItemProps {
  file: File;
  progress: number;
  onRemove: (filename: string) => void;
  getFileUrl?: (file: any) => string;
  getFileType?: (file: any) => string;
  getFileSize?: (file: any) => number;
}

export function UploadedFileItem({
  file,
  progress,
  onRemove,
  getFileUrl,
  getFileType,
  getFileSize,
}: UploadedFileItemProps) {
  const imageUrl =
    file instanceof File ? URL.createObjectURL(file) : getFileUrl?.(file) ?? "";
  const IS_FILE = file instanceof File;
  const locale = useLocale();
  const t = useTranslations();
  const fileType =
    file instanceof File ? file?.type : getFileType?.(file) ?? "";
  const fileSize = file instanceof File ? file?.size : getFileSize?.(file) ?? 0;
  useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0,
        }}
        className="border border-border rounded-lg p-2 flex flex-col"
        key={file.name}
      >
        <div className="flex items-center gap-2">
          <div className="w-18 h-14 bg-muted rounded-sm flex items-center justify-center self-start row-span-2 overflow-hidden">
            {fileType.includes("image") && imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            )}
            {fileType.includes("image") && !imageUrl && (
              <Icon icon="mdi-light:file" className="h-8 w-8 text-gray-600" />
            )}
            {fileType.includes("pdf") && (
              <Icon icon="proicons:pdf-2" className="h-8 w-8 text-gray-600" />
            )}
            {!fileType.includes("pdf") && !fileType.includes("image") && (
              <Icon icon="mdi-light:file" className="h-8 w-8 text-gray-600" />
            )}
          </div>

          <div className="flex-1 pr-1">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start w-full ">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-sm text-foreground truncate max-w-[250px]">
                    {file.name}
                  </span>

                  <Icon
                    icon="icon-park-outline:check-one"
                    className={cn(
                      "text-emerald-600 opacity-0 transition-all duration-300",
                      progress === 100 && "opacity-100"
                    )}
                  />
                </div>

                <span className="text-sm text-muted-foreground whitespace-nowrap ">
                  {Math.round(fileSize / 1024)} {t("COMMON.KB")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 bg-transparent! hover:text-red-500"
                onClick={async () => await onRemove(file.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {Math.round(progress || 0) !== 100 && IS_FILE && (
              <div className="flex items-center gap-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden flex-1">
                  <div
                    className="h-full w-full bg-emerald-600 rounded-full"
                    style={{
                      transformOrigin: locale === "ar" ? "right" : "left",
                      transform: `scaleX(${progress ? progress / 100 : 0})`,
                      transition: "transform 0.3s ease",
                    }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {Math.round(progress || 0)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
