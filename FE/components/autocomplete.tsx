"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface AutocompletePropsApi<T> {
  getOptionLabel?: (option: T | null) => string;
  getOptionId?: (option: T) => string | number;
  isOptionEqualToValue?: (option: T, value: T | null) => boolean;
  isOptionSelected?: (option: T, value: T | T[] | null) => boolean;
}

export interface AutocompleteProps<T> {
  inputProps?: React.ComponentProps<"input">;
  itemProps?: React.ComponentProps<"li">;
  options?: T[];
  allowFiltering?: boolean;
  api?: AutocompletePropsApi<T>;
  onAutoCompleteChange?: (value: T | null) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  defaultValue?: T;
  renderOptions?: (option: T, index: number) => ReactNode;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  helperText?: string;
  hasError?: boolean;
}

export default function Autocomplete<T>({
  inputProps,
  itemProps,
  options = [],
  allowFiltering = true,
  api,
  onAutoCompleteChange,
  onInputChange,
  placeholder,
  defaultValue,
  renderOptions,
  loading = false,
  loadingText = "جار التحميل",
  noOptionsText = "لا يوجد نتائج",
  helperText = "",
  hasError = false,
}: AutocompleteProps<T>) {
  const {
    getOptionId,
    getOptionLabel,
    isOptionSelected,
    isOptionEqualToValue,
  } = useAutocomplete<T>({
    getOptionLabel: api?.getOptionLabel,
    getOptionId: api?.getOptionId,
    isOptionEqualToValue: api?.isOptionEqualToValue,
  });
  // State Management ////////////////////////////////////////
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [optionsOpened, setOptionsOpened] = useState<boolean>(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );
  const [value, setValue] = useState<T | null>(defaultValue ?? null);
  const [inputValue, setInputValue] = useState<string>(
    defaultValue ? getOptionLabel(defaultValue) : ""
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // Custom Hooks ///////////////////////////////////////////
  // Helper Constants ///////////////////////////////////////////
  const hasHelperText = !!helperText || hasError;
  // DOM Manipulation ///////////////////////////////////////////
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Callbacks ///////////////////////////////////////////
  const handleInputFocus = useCallback(() => {
    if (inputRef) inputRef?.current?.focus();
  }, []);
  const handleAutocompleteBlur = useCallback(() => {
    setInputValue(value ? getOptionLabel(value) : "");
  }, [getOptionLabel, value]);
  const filterOptions = useCallback(
    (currentValue: string) => {
      if (!currentValue) currentValue = "";
      if (!allowFiltering) return;

      const newOptions = isSearching
        ? options?.filter(
            (option) =>
              getOptionLabel(option)
                ?.toLowerCase()
                ?.includes(currentValue?.toLowerCase()) &&
              !isOptionSelected(option, value)
          )
        : options?.filter((option) => !isOptionSelected(option, value));

      // Only update if options actually changed
      if (JSON.stringify(newOptions) !== JSON.stringify(filteredOptions)) {
        setFilteredOptions(newOptions);
      }
    },
    [
      allowFiltering,
      getOptionLabel,
      isOptionSelected,
      isSearching,
      options,
      value,
      filteredOptions, // Add this to dependencies
    ]
  );
  const handlePopoverToggle = useCallback(
    (newState: boolean) => {
      setIsSearching(false);
      setFocusedOptionIndex(
        value
          ? filteredOptions.findIndex((option) =>
              isOptionEqualToValue(option, value)
            )
          : null
      );
      setOptionsOpened(newState);
      handleAutocompleteBlur();
      if (newState) {
        // Only filter when opening
        filterOptions(inputValue);
      }
    },
    [
      filterOptions,
      filteredOptions,
      handleAutocompleteBlur,
      inputValue,
      isOptionEqualToValue,
      value,
    ]
  );
  const handleChange = useCallback(
    (newValue: T | null, closePortal: boolean = true) => {
      // NonOverridable Changes
      if (closePortal) handlePopoverToggle(false);
      handleInputFocus();
      filterOptions(getOptionLabel(newValue));
      // Overridable Changes
      if (onAutoCompleteChange) onAutoCompleteChange(newValue);
      setValue(newValue);
      setInputValue(getOptionLabel(newValue));
    },
    [
      filterOptions,
      getOptionLabel,
      handleInputFocus,
      handlePopoverToggle,
      onAutoCompleteChange,
    ]
  );

  const onInputBlur = useCallback(() => {
    setInputFocused(false);
    handleAutocompleteBlur();
  }, [handleAutocompleteBlur]);
  const handleOptionsNavigation = useCallback(
    (payload: 1 | -1) => {
      setFocusedOptionIndex((prevFocusedOptionIndex) => {
        if (filteredOptions?.length === 0) return prevFocusedOptionIndex;
        const temp =
          prevFocusedOptionIndex === null
            ? payload === 1
              ? filteredOptions?.length - 1
              : 0
            : prevFocusedOptionIndex;
        const nextFocusedOptionIndex = temp + payload;
        if (nextFocusedOptionIndex > filteredOptions?.length - 1) return 0;
        if (nextFocusedOptionIndex < 0) return filteredOptions?.length - 1;
        return nextFocusedOptionIndex;
      });
    },
    [filteredOptions?.length]
  );
  const handleArrowNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && optionsOpened) handleOptionsNavigation(1);
      if (e.key === "ArrowUp" && optionsOpened) handleOptionsNavigation(-1);
    },
    [handleOptionsNavigation, optionsOpened]
  );
  const handleKeyboardSelection = useCallback(
    (e: KeyboardEvent) => {
      if (optionsOpened && focusedOptionIndex !== null && e.key === "Enter") {
        handleChange(filteredOptions?.[focusedOptionIndex]);
      }
    },
    [filteredOptions, focusedOptionIndex, handleChange, optionsOpened]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Non-OverridableValues
      handlePopoverToggle(true);
      setIsSearching(true);
      filterOptions(e?.target?.value);
      // Non-OverridableValues
      setInputValue(e?.target?.value);
      if (e?.target?.value === "") handleChange(null, false);
      if (inputProps?.onChange) inputProps.onChange(e);
      onInputChange?.(e);
    },
    [
      filterOptions,
      handleChange,
      handlePopoverToggle,
      inputProps,
      onInputChange,
    ]
  );

  // Component LifeCycle /////////////////////////////////////////
  useEffect(() => {
    document.addEventListener("keydown", handleArrowNavigation);
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [handleArrowNavigation]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardSelection);
    return () =>
      document.removeEventListener("keydown", handleKeyboardSelection);
  }, [handleKeyboardSelection]);
  useEffect(() => {
    if (
      !loading &&
      JSON.stringify(options) !== JSON.stringify(filteredOptions)
    ) {
      setFilteredOptions(options);
    }
  }, [loading, options, filteredOptions]);
  return (
    // Input Wrapper
    <>
      <div
        className={cn(
          "flex flex-row hover:border-blue-400 transition-all transition-300 border-[1px] rounded-md h-[48px] items-center group/wrapper",
          inputFocused && "border-blue-500",
          hasError && "border-red-400"
        )}
      >
        <Popover onOpenChange={handlePopoverToggle} open={optionsOpened}>
          <PopoverTrigger asChild>
            <div className="flex items-center w-full ltr:pr-2 rtl:pl-2 group">
              <input
                data-slot="input"
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:group/wrapper:bg-red-500 text-black dark:text-gray-300 border-none outline-none ring-0 focus:ring-0",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  " h-full w-full",
                  "border-none outline-none ring-0 focus:border-none! focus:outline-none! focus:ring-0!",
                  "shadow-none focus:shadow-none",
                  inputProps?.className
                )}
                value={inputValue}
                onBlur={onInputBlur}
                onFocus={() => setInputFocused(true)}
                ref={inputRef}
                onChange={handleInputChange}
                placeholder={placeholder}
                {...inputProps}
              />
              {loading && (
                <div className="px-2">
                  <Icon
                    icon="formkit:spinner"
                    className="animate-spin text-xl"
                  />
                </div>
              )}
              {value && (
                <Icon
                  icon="material-symbols:close-rounded"
                  className={cn(
                    "bg-inherit p-0 m-0 cursor-pointer  transition-all  rounded-[50%] aspect-square w-5 h-5 hidden group-hover:flex items-center justify-center hover:bg-gray-700/30"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(null);
                  }}
                />
              )}
              <Icon
                icon={"line-md:chevron-down"}
                className={cn(
                  "cursor-pointer hover:bg-gray-700/30 p-1 rounded-full w-6 h-6 transition-all transition-300 aspect-square",
                  optionsOpened && "rotate-180"
                )}
              />
            </div>
          </PopoverTrigger>

          <PopoverContent
            sideOffset={12}
            className="w-[var(--radix-popover-trigger-width)] p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
            asChild
          >
            <ul className="dark:bg-autocomplete-options-dark-background px-2 py-1 flex flex-col gap-1.5">
              {!loading && !filteredOptions?.length && (
                <li
                  className={cn(
                    "py-2 px-2 bg-inherit rounded-md hover:brightness-125 transition-all transition-300 focus:border-0 focus:outline-0",
                    itemProps?.className
                  )}
                >
                  {noOptionsText}
                </li>
              )}
              {loading && (
                <li
                  className={cn(
                    "py-2 px-2 bg-inherit rounded-md hover:brightness-125 transition-all transition-300 focus:border-0 focus:outline-0",
                    itemProps?.className
                  )}
                >
                  {loadingText}
                </li>
              )}
              {!loading &&
                filteredOptions?.map((option, index) => {
                  const isFocused = focusedOptionIndex === index;
                  const defaultProps = {
                    key: option,
                    tabIndex: 0,
                    onClick: () => handleChange(option),
                    className: cn(
                      "py-2 px-2 bg-inherit rounded-md hover:brightness-125 transition-all transition-300 cursor-pointer focus:border-0 focus:outline-0",
                      isFocused && "brightness-125",
                      itemProps?.className
                    ),
                  };

                  // If user provides a custom element (e.g., <li>), clone it and inject props
                  if (renderOptions) {
                    const customElement = renderOptions(option, index);

                    // Ensure it's a valid ReactElement before cloning
                    if (React.isValidElement(customElement)) {
                      return React.cloneElement(customElement, {
                        ...defaultProps,
                        ...(customElement.props ?? {}), // Give user ability to override injected props
                        ...({
                          className: cn(
                            defaultProps.className,
                            (customElement.props as any).className
                          ),
                        } as any),
                      });
                    }
                  }

                  // Fallback: default rendering
                  return (
                    <li {...defaultProps} key={getOptionId(option)}>
                      {getOptionLabel(option)}
                    </li>
                  );
                })}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      {hasHelperText && (
        <span
          // {...inputProps?.helperText}
          className={cn(
            "text-sm font-semibold text-[#e74c3c]"
            // inputProps?.helperText?.className
          )}
        >
          {helperText}
        </span>
      )}
    </>
  );
}

function useAutocomplete<T>({
  getOptionLabel,
  getOptionId,
  isOptionEqualToValue,
  isOptionSelected,
}: AutocompletePropsApi<T>) {
  const finalGetOptionId =
    getOptionId ?? ((option: T) => option as string | number);
  const finalGetOptionLabel =
    getOptionLabel ??
    ((option: T | null) =>
      typeof option === "string" ? (option as string) ?? "" : "");
  const finalIsOptionEqualToValue =
    isOptionEqualToValue ??
    ((option: T, value: T | null): boolean => option === value);
  const finalIsOptionSelected =
    isOptionSelected ??
    ((option: T, value: T | T[] | null): boolean =>
      Array.isArray(value)
        ? !!value?.find((val) => finalIsOptionEqualToValue(option, val))
        : finalIsOptionEqualToValue(option, value));

  return {
    getOptionId: finalGetOptionId,
    getOptionLabel: finalGetOptionLabel,
    isOptionEqualToValue: finalIsOptionEqualToValue,
    isOptionSelected: finalIsOptionSelected,
  };
}
