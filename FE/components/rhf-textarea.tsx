import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ComponentProps } from "react";
import { Textarea } from "./ui/textarea";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: React.ComponentProps<"textarea">;
  labelProps?: ComponentProps<"label">;
  helperTextProps?: ComponentProps<"p">;
  mandatoryField?: boolean;
} & ComponentProps<"div">;
export default function RHFTextarea({
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
            <Textarea placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage {...helperTextProps} />
        </FormItem>
      )}
    />
  );
}
