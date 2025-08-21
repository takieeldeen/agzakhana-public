import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"div">;
export default function CircularProgress({ className, ...other }: Props) {
  return (
    <div
      {...other}
      className={cn(
        "w-12 h-12 rounded-full border-t-2 border-agzakhana-primary animate-spin",
        className
      )}
    />
  );
}
