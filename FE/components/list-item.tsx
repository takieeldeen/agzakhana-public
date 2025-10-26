import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type ListItemProps = {
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  primaryLabelProps?: ComponentProps<"p">;
  secondaryLabelProps?: ComponentProps<"p">;
} & ComponentProps<"div">;
export default function ListItem({
  primaryLabel,
  secondaryLabel,
  primaryLabelProps,
  secondaryLabelProps,
  ...other
}: ListItemProps) {
  return (
    <div
      {...other}
      className={cn("flex flex-col gap-1 flex-1", other?.className)}
    >
      {primaryLabel && (
        <p
          {...primaryLabelProps}
          className={cn(
            "font-bold text-black text-lg dark:text-white",
            primaryLabelProps?.className
          )}
        >
          {primaryLabel}
        </p>
      )}
      {secondaryLabel && (
        <p
          {...secondaryLabelProps}
          className={cn("dark:text-gray-400", secondaryLabelProps?.className)}
        >
          {secondaryLabel}
        </p>
      )}
    </div>
  );
}
