import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
} & ComponentProps<"span">;
export default function RHFError({ name, ...other }: Props) {
  const {
    formState: { errors },
  } = useFormContext();
  const ERROR = errors?.[name];
  const HAS_ERROR = !!ERROR;
  if (!HAS_ERROR) return null;
  return (
    <span
      {...other}
      className={cn(
        "text-destructive text-sm font-semibold block",
        other?.className
      )}
    >
      {ERROR?.message as string}
    </span>
  );
}
