import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input, InputProps } from "./ui/input";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: InputProps;
  labelProps?: ComponentProps<"label">;
  helperTextProps?: ComponentProps<"p">;
  mandatoryField?: boolean;
} & ComponentProps<"div">;
export default function RHFTextfield({
  name,
  label,
  placeholder,
  inputProps,
  labelProps,
  helperTextProps,
  mandatoryField,
  ...other
}: Props) {
  const methods = useFormContext();
  const locale = useLocale();
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem
          {...other}
          className={cn(other?.className)}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {!!label && (
            <FormLabel
              {...labelProps}
              className={cn(
                "dark:text-gray-300 dark:bg-transparent ",
                labelProps?.className
              )}
            >
              {label}
              {mandatoryField && (
                <span className="font-bold text-red-700">*</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              {...inputProps}
              className={cn(
                "dark:text-gray-300 dark:bg-transparent rtl:text-right",
                inputProps?.className
              )}
            />
          </FormControl>
          <div className="min-h-4 ">
            <FormMessage
              {...helperTextProps}
              className={cn("rtl:text-right", helperTextProps?.className)}
            />
          </div>
        </FormItem>
      )}
    />
  );
}
