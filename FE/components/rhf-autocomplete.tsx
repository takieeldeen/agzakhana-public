import { useFormContext } from "react-hook-form";
import Autocomplete, { AutocompleteProps } from "./autocomplete";
export type RHFAutocompleteProps<T> = {
  name: string;
  onChange?: (value: T | null) => void;
} & Omit<AutocompleteProps<T>, "onAutoCompleteChange">;
export default function RHFAutocomplete<T>({
  name,
  onChange,
  ...props
}: RHFAutocompleteProps<T>) {
  const {
    setValue,
    watch,
    formState: { defaultValues },
  } = useFormContext();
  const key = defaultValues?.[name] ?? watch()?.[name];
  return (
    <Autocomplete
      key={key}
      onAutoCompleteChange={(value) =>
        onChange ? onChange(value) : setValue(name, value)
      }
      defaultValue={defaultValues?.[name]}
      {...props}
    />
  );
}
