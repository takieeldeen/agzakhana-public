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
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
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
  mandatoryField?: boolean;
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
  multiple?: boolean;
  triggerProps?: React.ComponentProps<"button">;
} & React.ComponentProps<"div">;

export function RHFComboxbox<T>({
  name,
  mandatoryField,
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
  multiple,
  triggerProps,
  ...other
}: RHFComboboxProps<T>) {
  // RHF Hooks /////////////////////////////////////
  const form = useFormContext();
  const {
    formState: { errors },
  } = form;
  const HAS_ERRORS = errors?.[name];
  const defaultValue = form?.formState?.defaultValues?.[name];
  const formVal = form?.watch()?.[name];
  // State Management /////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [val, setval] = React.useState(defaultValue);
  const [multipleVal, setMultipleVal] = React.useState(defaultValue);
  const t = useTranslations();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

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
  const handleRemoveOption = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      option: T,
      field: ControllerRenderProps<FieldValues, string>
    ) => {
      e.preventDefault();
      const filteredOptions = multipleVal?.filter(
        (opt: T) => !api?.optionValueComparator(opt, option)
      );
      setMultipleVal(filteredOptions);
      field.onChange(filteredOptions);
    },
    [api, multipleVal]
  );
  React.useEffect(() => {
    setval(formVal);
  }, [formVal]);

  if (multiple)
    return (
      <FormField
        key={val}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem
            {...other}
            className={cn("flex flex-col flex-1", other?.className)}
          >
            {!!label && (
              <FormLabel
                {...labelProps}
                className={cn("dark:text-gray-200", labelProps?.className)}
              >
                {label}
                {mandatoryField && (
                  <span className="font-bold text-red-700">*</span>
                )}
              </FormLabel>
            )}
            <div className="relative w-full ">
              <Popover open={open} onOpenChange={setOpen} modal>
                <PopoverTrigger asChild>
                  <Button
                    ref={buttonRef}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    {...triggerProps}
                    className={cn(
                      "w-full min-h-12 h-fit justify-between dark:bg-dark-background dark:text-gray-200 hover:dark:brightness-100 hover:dark:bg-dark-card-background hover:dark:border-emerald-600",
                      !field.value &&
                        "text-muted-foreground dark:text-gray-500",
                      HAS_ERRORS && "border-red-600 dark:border-red-400",
                      triggerProps?.className
                    )}
                  >
                    {/* {field.value
                      ? api.getOptionLabel(field.value)
                      : placeholder} */}
                    <ul className="flex flex-row gap-2 flex-wrap flex-1">
                      {Array.isArray(field?.value) && field?.value?.length > 0
                        ? field?.value?.map((option) => (
                            <OptionTag
                              key={api.getOptionValue(option)}
                              option={option}
                              onRemove={handleRemoveOption}
                              label={api.getOptionLabel(option)}
                              field={field}
                            />
                          ))
                        : placeholder}
                    </ul>
                    <div className=" flex flex-row items-center gap-2">
                      {/* <div className="absolute right-1 rtl:left-1 rtl:right-auto top-6 -translate-y-1/2 flex flex-row items-center gap-2"> */}
                      <Icon icon="mi:chevron-down" />
                      {isLoading && <Spinner />}

                      {clearable && field.value && field?.value?.length > 0 && (
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
                <PopoverContent
                  align="start"
                  sideOffset={4}
                  className="p-0 "
                  style={{ width: buttonRef.current?.offsetWidth }}
                >
                  <Command
                    className="dark:bg-dark-card "
                    filter={(option, search) => {
                      const parsedOption = parseOption(option) as T;
                      if (
                        multipleVal.find((option: T) =>
                          api.optionValueComparator(parsedOption, option)
                        )
                      )
                        return 0;
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
                      className={cn("h-9")}
                    />
                    <CommandList className="dark:bg-dark-background">
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
                          ?.filter(
                            (cur) =>
                              !field?.value?.find((opt: T) =>
                                api.optionValueComparator(opt, cur)
                              )
                          )
                          .map((option) => (
                            <CommandItem
                              key={api.getOptionValue(option)}
                              value={api.getOptionValue(option)}
                              onSelect={() => {
                                setMultipleVal((prev: T[]) => [
                                  ...prev,
                                  option,
                                ]);
                                field.onChange([
                                  ...(field.value ?? []),
                                  option,
                                ]);
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
  return (
    <FormField
      key={val}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col flex-1", other?.className)}>
          {!!label && (
            <FormLabel
              {...labelProps}
              className={cn("dark:text-gray-200", labelProps?.className)}
            >
              {label}
              {mandatoryField && (
                <span className="font-bold text-red-700">*</span>
              )}
            </FormLabel>
          )}
          <div className="relative w-full ">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  ref={buttonRef}
                  variant="outline"
                  role="combobox"
                  {...triggerProps}
                  aria-expanded={open}
                  className={cn(
                    "w-full h-12 justify-between dark:bg-dark-card dark:text-gray-200 hover:dark:bg-dark-card-background hover:dark:border-emerald-600",
                    !field.value && "text-muted-foreground dark:text-gray-500",
                    HAS_ERRORS && "border-red-600 dark:border-red-400",

                    triggerProps?.className
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
              <PopoverContent
                align="start"
                sideOffset={4}
                className="p-0 "
                style={{ width: buttonRef.current?.offsetWidth }}
              >
                <Command
                  className="dark:bg-dark-card"
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
                  <CommandList className="dark:bg-dark-background">
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

function OptionTag<T>({
  option,
  onRemove,
  label,
  field,
}: {
  option: T;
  onRemove: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: T,
    field: ControllerRenderProps<FieldValues, string>
  ) => void;
  label: string;
  field: ControllerRenderProps<FieldValues, string>;
}) {
  return (
    <li className="bg-emerald-600 text-white px-2 py-1 text-xs rounded-md flex flex-row gap-1 transition-all duration-300 hover:bg-emerald-700">
      {label}
      <div
        className="cursor-pointer"
        onClick={(e) => onRemove(e, option, field)}
      >
        <Icon icon="charm:cross" />
      </div>
    </li>
  );
}
