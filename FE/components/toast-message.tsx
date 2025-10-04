import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  variant: "success" | "fail";
  title?: string;
  subtitle?: string;
  t: number | string;
};
export default function ToastMessage({
  variant = "success",
  title,
  subtitle,
  t,
}: Props) {
  const tr = useTranslations();
  const variantProps = {
    success: {
      title: tr("TOAST.SUCCESSFUL_PROCESS"),
      icon: "iconamoon:check-fill",
      color: "bg-agzakhana-primary",
    },
    fail: {
      title: tr("TOAST.UNSUCCESSFUL_PROCESS"),
      icon: "material-symbols:close-rounded",
      color: "bg-red-500",
    },
  };
  let finalTitle = "";
  if (!!title) finalTitle = title;
  if (!title) finalTitle = variantProps[variant].title;
  return (
    <div className="bg-white rounded-md min-w-96 w-fit  border-l-2 flex flex-row gap-2 items-stretch overflow-hidden pr-2 rtl:pr-0 rtl:pl-2 rtl:font-cairo dark:bg-card-background-dark ">
      <div
        className={cn(
          "bg-agzakhana-primary w-1",
          variantProps?.[variant]?.color
        )}
      />
      <div className="min-h-12 flex flex-row items-start  gap-3 mr-auto rtl:ml-auto rtl:mr-0 py-4">
        <div
          className={cn(
            "h-8 w-8 bg-agzakhana-primary text-white flex items-center justify-center rounded-full aspect-square text-xl",
            variantProps?.[variant]?.color
          )}
        >
          <Icon icon={variantProps?.[variant]?.icon} />
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-semibold leading-6 dark:text-gray-200">
            {finalTitle}
          </span>
          {!!subtitle && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <Button
        className="bg-gray-100 dark:bg-gray-800 h-8 w-8 items-center justify-center flex rounded-full my-auto aspect-square justify-self-end text-gray-500 dark:text-gray-200"
        onClick={() => toast.dismiss(t)}
      >
        <Icon icon="material-symbols:close-rounded" />
      </Button>
    </div>
  );
}

export function pushMessage({ title, subtitle, variant }: Omit<Props, "t">) {
  toast.custom((t) => (
    <ToastMessage title={title} subtitle={subtitle} variant={variant} t={t} />
  ));
}
