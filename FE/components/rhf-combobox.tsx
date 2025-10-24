"use client";

import * as React from "react";
import { Check, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { LabelProps } from "@radix-ui/react-label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Spinner } from "./ui/spinner";
import { CommandLoading } from "cmdk";

const parseOption = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};

type RHFComboboxProps<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  noOptionsText?: string;
  options?: T[];
  labelProps?: LabelProps;
  getOptionLabel?: (option: T | undefined) => string;
  optionValueComparator?: (option: T, value: T) => boolean;
  getOptionValue?: (option: T) => string;
  onChange?: (newVal: T, reason: "clear" | "change") => void;
  isLoading?: boolean;
};

export function RHFComboxbox<T>({
  name,
  label,
  placeholder,
  clearable = true,
  noOptionsText,
  options = [],
  labelProps,
  getOptionLabel,
  optionValueComparator,
  getOptionValue,
  onChange,
  isLoading = false,
}: RHFComboboxProps<T>) {
  // RHF Hooks /////////////////////////////////////
  const form = useFormContext();
  const defaultValue = form?.formState?.defaultValues?.[name];
  const formVal = form?.watch()?.[name];
  // State Management /////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [val, setval] = React.useState(defaultValue);
  const t = useTranslations();
  // API Functions
  // default API /////////////////////////////////////////////////
  const defaultOptionValueComparator = React.useCallback(
    (option: T, value: T) => option === value,
    []
  );
  const defaultGetOptionValue = React.useCallback(
    (option: T) =>
      typeof option === "string" ? option : JSON.stringify(option),
    []
  );
  const defaultGetOptionLabel = React.useCallback((option: T | undefined) => {
    if (!option) return "";
    return typeof option === "string" ? option : JSON.stringify(option);
  }, []);

  const api = React.useMemo(
    () => ({
      optionValueComparator:
        optionValueComparator ?? defaultOptionValueComparator,
      getOptionValue: getOptionValue ?? defaultGetOptionValue,
      getOptionLabel: getOptionLabel ?? defaultGetOptionLabel,
    }),
    [
      defaultGetOptionLabel,
      defaultGetOptionValue,
      defaultOptionValueComparator,
      getOptionLabel,
      getOptionValue,
      optionValueComparator,
    ]
  );
  React.useEffect(() => {
    setval(formVal);
  }, [formVal]);
  return (
    <FormField
      key={val}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {!!label && (
            <FormLabel
              {...labelProps}
              className={cn("dark:text-gray-200", labelProps?.className)}
            >
              {label}
            </FormLabel>
          )}
          <div className="relative w-full ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full h-12 justify-between dark:bg-dark-card dark:text-gray-200",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? api.getOptionLabel(field.value) : placeholder}
                  <div className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 flex flex-row items-center gap-2">
                    <Icon icon="mi:chevron-down" />
                    {isLoading && <Spinner />}

                    {clearable && field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className=" h-6 w-6 p-0 text-muted-foreground "
                        onClick={(e) => {
                          field.onChange(defaultValue);
                          setval(defaultValue);
                          setOpen(false);
                          onChange?.(defaultValue, "clear");
                          e.preventDefault();
                        }}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <Command
                  filter={(option, search) => {
                    const parsedOption = parseOption(option) as T;
                    if (api.optionValueComparator(parsedOption, val)) return 0;
                    if (
                      !!option &&
                      api
                        .getOptionLabel(parsedOption)
                        ?.includes?.(search.toLowerCase())
                    )
                      return 1;
                    return 0;
                  }}
                >
                  <CommandInput
                    placeholder={placeholder}
                    className={cn("h-9 ")}
                  />
                  <CommandList>
                    {isLoading && (
                      <CommandLoading className="text-sm py-2 px-2 text-muted-foreground">
                        {t("COMMON.LOADING")}
                      </CommandLoading>
                    )}
                    <CommandEmpty>
                      {noOptionsText ?? t("COMMON.NO_OPTIONS")}
                    </CommandEmpty>
                    <CommandGroup>
                      {options
                        // ?.filter((opt) => opt?.value !== field?.value?.value)
                        ?.filter((opt) => !api.optionValueComparator(opt, val))
                        .map((option) => (
                          <CommandItem
                            key={api.getOptionValue(option)}
                            value={api.getOptionValue(option)}
                            onSelect={() => {
                              setval(option);
                              field.onChange(option);
                              onChange?.(option, "change");

                              setOpen(false);
                            }}
                          >
                            {api.getOptionLabel(option)}
                            <Check
                              className={cn(
                                "ml-auto",
                                api.optionValueComparator(option, val)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="min-h-4">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
