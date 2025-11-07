"use client";

import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale } from "next-intl";
import { arSA, enUS } from "date-fns/locale";
import React from "react";

type RHFDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  mandatoryField?: boolean;
};

export function RHFDatePicker({
  name,
  label,
  placeholder,
  clearable = true,
  mandatoryField,
}: RHFDatePickerProps) {
  const form = useFormContext();
  const locale = useLocale();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full flex-1">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col w-full flex-1">
            {!!label && (
              <FormLabel className="dark:text-gray-200 ">
                {label}
                {mandatoryField && (
                  <span className="font-bold text-red-700">*</span>
                )}
              </FormLabel>
            )}
            <div className="relative w-full ">
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl className="">
                    <Button
                      ref={buttonRef}
                      variant="outline"
                      className={cn(
                        "w-full h-12 pl-3 pr-10 text-left justify-between rtl:text-right  font-normal dark:text-white ",
                        !field.value &&
                          "text-muted-foreground dark:text-muted-foreground",
                        "bg-transparent!"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: locale === "ar" ? arSA : enUS,
                        })
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="   h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-full p-0"
                  align="start"
                  // style={{ width: buttonRef.current?.offsetWidth }}
                >
                  <Calendar
                    locale={locale === "ar" ? arSA : enUS}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                    className="h-full w-96 dark:bg-dark-background! rounded-lg"
                  />
                </PopoverContent>
              </Popover>

              {clearable && field.value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-8 rtl:left-8 rtl:right-auto top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive "
                  onClick={() => field.onChange(null)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="min-h-4">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
