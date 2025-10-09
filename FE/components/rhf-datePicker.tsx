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

type RHFDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
};

export function RHFDatePicker({
  name,
  label,
  placeholder,
  clearable = true,
}: RHFDatePickerProps) {
  const form = useFormContext();
  const locale = useLocale();
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            {!!label && (
              <FormLabel className="dark:text-gray-200">{label}</FormLabel>
            )}
            <div className="relative w-full">
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 pl-3 pr-10 text-left font-normal dark:text-gray-200",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: locale === "ar" ? arSA : enUS,
                        })
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    locale={locale === "ar" ? arSA : enUS}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>

              {clearable && field.value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-8 rtl:left-8 rtl:right-auto top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
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
