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

type RHFComboboxProps = {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  noOptionsText?: string;
  options?: { label: string; value: string }[];
  labelProps?: LabelProps;
  getOptionLabel?: (option: any) => string;
};

export function RHFComboxbox({
  name,
  label,
  placeholder,
  clearable = true,
  noOptionsText,
  options = [],
  labelProps,
  getOptionLabel,
}: RHFComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext();
  const defaultValue = form?.formState?.defaultValues?.[name];
  const t = useTranslations();
  const defaultGetOptionLabel = React.useCallback(
    (option: any) => {
      if (getOptionLabel) {
        getOptionLabel(option);
      } else {
        return option.label;
      }
    },
    [getOptionLabel]
  );
  return (
    <FormField
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
                    "w-full h-12 justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? field.value.label : placeholder}
                  <Icon icon="mi:chevron-down" />
                  {clearable && field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-8 rtl:left-8 rtl:right-auto top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground"
                      onClick={(e) => {
                        field.onChange(defaultValue);
                        setOpen(false);
                        e.preventDefault();
                      }}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <Command
                  filter={(value, search) => {
                    console.log(value, search);
                    if (field?.value?.value === value) return 0;
                    if (
                      !!value &&
                      options
                        ?.find((opt) => opt?.value === value)
                        ?.label?.includes?.(search.toLowerCase())
                    )
                      return 1;
                    return 0;
                  }}
                >
                  <CommandInput
                    placeholder={placeholder}
                    className={cn("h-9")}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {noOptionsText ?? t("COMMON.NO_OPTIONS")}
                    </CommandEmpty>
                    <CommandGroup>
                      {options
                        ?.filter((opt) => opt?.value !== field?.value?.value)
                        .map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              console.log(option, "Field Option");
                              field.onChange(option);
                              setOpen(false);
                            }}
                          >
                            {defaultGetOptionLabel(option)}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === option.value
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
