"use client";
import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, LoadingButton } from "./ui/button";
import EllipsisTypography from "./ellipsis-typography";
import { useTranslations } from "next-intl";

type PromptVariant = "SUCCESS" | "ALERT";
type PromptContextProps = {
  closePrompt: VoidFunction;
  showPrompt: ({
    dialogTitle,
    title,
    content,
    icon,
    variant,
    actionProps,
  }: {
    dialogTitle?: string;
    title?: string;
    content?: string;
    icon?: string;
    variant?: PromptVariant;
    actionProps?: {
      actionTitle?: string;
      actionFn?: VoidFunction;
    };
  }) => void;
};
const PromptContext = createContext<PromptContextProps | undefined>(undefined);

export default function PromptProvider({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const variantProps = useMemo(
    () => ({
      SUCCESS: {
        dialogTitle: {
          styling: "bg-emerald-600",
          text: t("COMMON.SUCCESS_DIALOG_TITLE"),
        },
        icon: {
          styling: "text-emerald-600",
          name: "mingcute:check-fill",
        },
        title: {
          styling: "text-black",
          text: "Confirmation",
        },
        actionTitle: {
          styling: "bg-emerald-600",
          text: t("COMMON.CONFIRM_ACTION"),
        },
      },
      ALERT: {
        dialogTitle: {
          styling: "bg-rose-800",
          text: t("COMMON.SUCCESS_DIALOG_TITLE"),
        },
        icon: {
          styling: "text-rose-800",
          name: "mingcute:check-fill",
        },
        title: {
          styling: "text-black",
          text: "Confirmation",
        },
        actionTitle: {
          styling: "bg-rose-800",
          text: t("COMMON.CONFIRM_ACTION"),
        },
      },
    }),
    [t]
  );
  const [promptVisibility, setPromptVisibility] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>(
    variantProps?.SUCCESS?.dialogTitle?.text
  );
  const [icon, setIcon] = useState<string>(variantProps?.SUCCESS?.icon.name);
  const [title, setTitle] = useState<string>("");

  const [mainAction, setMainAction] = useState<
    | undefined
    | {
        actionTitle?: string;
        actionFn?: VoidFunction;
      }
  >(undefined);
  const [content, setContent] = useState<string>("");
  const [variant, setVariant] = useState<PromptVariant>("SUCCESS");
  const [onClose, setOnClose] = useState<{ closeFn: VoidFunction }>({
    closeFn: () => setPromptVisibility(false),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [content, setContent] = useState<string>("Prompt Title");
  const showPrompt = useCallback(
    ({
      dialogTitle,
      title,
      content,
      icon,
      variant = "SUCCESS",
      onClose,
      actionProps,
    }: {
      dialogTitle?: string;
      title?: string;
      content?: string;
      icon?: string;
      variant?: PromptVariant;
      onClose?: VoidFunction;
      actionProps?: {
        actionTitle?: string;
        actionFn?: VoidFunction;
      };
    }) => {
      setPromptVisibility(true);
      if (onClose)
        setOnClose({
          closeFn: () => {
            onClose();
            setPromptVisibility(false);
          },
        });
      if (icon) setIcon(icon ?? variantProps?.[variant]?.icon.name);
      setDialogTitle(dialogTitle ?? variantProps?.[variant]?.dialogTitle?.text);
      setVariant(variant ?? "SUCCESS");
      setContent(content ?? "");
      setTitle(title ?? "");
      if (actionProps) setMainAction(actionProps);
    },
    [variantProps]
  );
  const handleActionClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      try {
        setIsLoading(true);
        if (mainAction) await mainAction?.actionFn?.();
      } catch {
      } finally {
        setIsLoading(false);
      }
    }, [mainAction]);
  const closePrompt = useCallback(() => {
    onClose?.closeFn?.();
    setPromptVisibility(false);
  }, [onClose]);
  const api = useMemo(
    () => ({
      showPrompt,
      closePrompt,
    }),
    [closePrompt, showPrompt]
  );
  return (
    <PromptContext.Provider value={api}>
      {children}
      <Dialog open={promptVisibility}>
        <DialogPortal>
          <DialogOverlay className="backdrop-blur-sm">
            <DialogContent
              showCloseButton={false}
              className="bg-white dark:bg-dark-card p-0 !outline-none !ring-0 !border-0 shadow-none overflow-hidden"
            >
              <DialogTitle
                className={cn(
                  "h-12 flex items-center px-4 text-white text-lg font-semibold",
                  variantProps?.[variant].dialogTitle.styling
                )}
              >
                {dialogTitle}
              </DialogTitle>
              <div className="flex flex-col items-center gap-2 py-2">
                <div
                  className={cn(
                    "h-32 w-32 rounded-full border-gray-300 border-2 flex items-center justify-center text-8xl dark:border-dark-600",
                    variantProps?.[variant].icon.styling
                  )}
                >
                  <Icon icon={icon} />
                </div>
                <div className="flex flex-col items-center gap-1 py-4">
                  <EllipsisTypography
                    className={cn(
                      "font-semibold text-black text-center w-full dark:text-white"
                    )}
                  >
                    {title}
                  </EllipsisTypography>
                  <EllipsisTypography
                    maxLines={2}
                    className="text-center dark:text-gray-400"
                  >
                    {content}
                  </EllipsisTypography>
                </div>
                <div className="flex ltr:flex-row-reverse rtl:flex-row gap-2 w-full justify-center">
                  <Button
                    disabled={isLoading}
                    className="h-12 w-[calc(50%_-_12px)] border-border border-2 text-black dark:text-white"
                    variant="ghost"
                    onClick={closePrompt}
                  >
                    {t("COMMON.CANCEL_ACTION")}
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    onClick={handleActionClick}
                    className={cn(
                      "h-12 w-[calc(50%_-_12px)] dark:text-white",
                      variantProps?.[variant].actionTitle.styling
                    )}
                  >
                    {mainAction?.actionTitle ??
                      variantProps?.[variant]?.actionTitle?.text}
                  </LoadingButton>
                </div>
              </div>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const values = useContext(PromptContext);
  if (!values) throw Error("usePrompt can only be used inside prompt provider");
  return values;
}
