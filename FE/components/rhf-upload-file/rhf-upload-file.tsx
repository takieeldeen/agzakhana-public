import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { InputProps } from "../ui/input";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import FileUpload, { FileUploadProps } from "./upload-file";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: InputProps;
  labelProps?: ComponentProps<"label">;
  helperTextProps?: ComponentProps<"p">;
  mandatoryField?: boolean;
} & FileUploadProps;
export default function RHFFileUpload({
  name,
  label,
  labelProps,
  mandatoryField,
  ...other
}: Props) {
  const methods = useFormContext();
  const { watch } = methods;
  const defaultValue = watch()?.[name];
  const locale = useLocale();
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(other?.className, " w-full dark:bg-dark-card")}
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
          <FileUpload
            {...other}
            className="w-full"
            onFilesChange={(files) => {
              field.onChange(files);
            }}
            files={defaultValue}
            rhf
          />
        </FormItem>
      )}
    />
  );
}
