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
} & ComponentProps<"div">;
export default function RHFTextfield({
  name,
  label,
  placeholder,
  inputProps,
  labelProps,
  helperTextProps,
  ...other
}: Props) {
  const methods = useFormContext();
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem {...other}>
          {!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage {...helperTextProps} />
        </FormItem>
      )}
    />
  );
}
