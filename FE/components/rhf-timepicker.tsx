import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import TimePicker from "./timePicker";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: React.ComponentProps<"input">;
  labelProps?: ComponentProps<"label">;
  helperTextProps?: ComponentProps<"p">;
  mandatoryField?: boolean;
} & ComponentProps<"div">;
export default function RHFTimePicker({
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
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem {...other}>
          {!!label && (
            <FormLabel
              {...labelProps}
              className={cn(
                "dark:text-gray-300 dark:bg-transparent",
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
            <TimePicker
              placeholder={placeholder}
              {...field}
              {...inputProps}
              className={cn(
                "dark:text-gray-300 dark:bg-dark-background",
                inputProps?.className
              )}
            />
          </FormControl>
          <div className="min-h-4 ">
            <FormMessage {...helperTextProps} />
          </div>
        </FormItem>
      )}
    />
  );
}
