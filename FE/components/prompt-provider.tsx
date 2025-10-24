"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import EllipsisTypography from "./ellipsis-typography";
import { useTranslations } from "next-intl";

type PromptVariant = "SUCCESS";
type PromptContextProps = {
  showPrompt: VoidFunction;
};
const PromptContext = createContext<PromptContextProps | undefined>(undefined);

export default function PromptProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const [promptVisibility, setPromptVisibility] = useState<boolean>(true);
  const [dialogTitle, setDialogTitle] = useState<string>("تأكيد تفعيل الدور");
  const [title, setTitle] = useState<string>(
    "هل ترغب في تفعيل دور مساعد صيدلي ؟"
  );
  const [content, setContent] =
    useState<string>(`في حالة تفعيل الدور سيتمكن كل الحاصلين على هذا الدور من ممارسة
                  جميع الصلاحيات الخاصة به بدون استثنائات`);
  const [variant, setVariant] = useState<PromptVariant>("SUCCESS");
  const variantProps = {
    SUCCESS: {
      dialogTitle: {
        styling: "bg-emerald-600",
        text: "عملية ناجحة",
      },
      icon: {
        styling: "text-emerald-600",
        name: "mingcute:check-fill",
      },
      title: {
        styling: "text-black",
        text: "هل ترغب في تفعيل دور مساعد صيدلي ؟",
      },
    },
  };
  // const [content, setContent] = useState<string>("Prompt Title");
  const showPrompt = useCallback(
    ({
      dialogTitle,
      title,
      content,
      icon,
      variant,
      actionTitle,
    }: {
      dialogTitle?: string;
      title?: string;
      content?: string;
      icon?: string;
      variant?: string;
      actionTitle?: string;
    }) => {
      setPromptVisibility(true);
      if (title) setDialogTitle(title);
    },
    []
  );
  const api = useMemo(
    () => ({
      showPrompt,
    }),
    [showPrompt]
  );

  return (
    <PromptContext.Provider value={api}>
      {children}
      {/* <div className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-black/15 flex items-center justify-center z-30 "> */}
      <Dialog open={promptVisibility}>
        <DialogOverlay className="backdrop-blur-sm">
          <DialogContent
            showCloseButton={false}
            className="bg-white p-0 !outline-none !ring-0 !border-0 shadow-none overflow-hidden"
          >
            <DialogTitle
              className={cn(
                "h-12 flex items-center px-4 text-white text-lg font-semibold",
                variantProps["SUCCESS"].dialogTitle.styling
              )}
            >
              {dialogTitle}
            </DialogTitle>
            <div className="flex flex-col items-center gap-2 py-2">
              <div
                className={cn(
                  "h-32 w-32 rounded-full border-gray-300 border-2 flex items-center justify-center text-8xl",
                  variantProps["SUCCESS"].icon.styling
                )}
              >
                <Icon icon={variantProps["SUCCESS"].icon.name} className="" />
              </div>
              <div className="flex flex-col items-center gap-1 py-4">
                <EllipsisTypography
                  className={cn("font-semibold text-black text-center w-full")}
                >
                  {title}
                </EllipsisTypography>
                <EllipsisTypography maxLines={2} className="text-center ">
                  {content}
                </EllipsisTypography>
              </div>
              <div className="flex flex-row gap-2 w-full justify-center">
                <Button
                  className="h-12 w-[calc(50%_-_12px)] border-border border-2 text-black"
                  variant="ghost"
                >
                  إلغاء
                </Button>
                <Button className="h-12 w-[calc(50%_-_12px)] bg-emerald-600">
                  تأكيد
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
      {/* </div> */}
    </PromptContext.Provider>
  );
}
