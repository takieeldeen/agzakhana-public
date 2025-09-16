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
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem {...other}>
          {!!label && (
            <FormLabel {...labelProps}>
              {label}
              {mandatoryField && (
                <span className="font-bold text-red-700">*</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <div className="min-h-4">
            <FormMessage {...helperTextProps} />
          </div>
        </FormItem>
      )}
    />
  );
}
