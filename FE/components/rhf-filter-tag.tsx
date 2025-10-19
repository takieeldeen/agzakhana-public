"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LabelProps } from "@radix-ui/react-label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";

type RHFFilterTagProps = {
  name: string;
  label?: string;
  placeholder?: string;
  clearable?: boolean;
  labelProps?: LabelProps;
  value: any;
};

export function RHFFilterTag({
  name,
  label,
  placeholder,
  clearable = false,
  labelProps,
  value,
}: RHFFilterTagProps) {
  const form = useFormContext();
  const checked = form?.watch()?.[name] === value;
  const defaultValue = form?.formState?.defaultValues?.[name];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {!!label && (
            <FormLabel
              {...labelProps}
              className={cn("dark:text-gray-200", labelProps?.className)}
            >
              {label}
            </FormLabel>
          )}
          <div className="relative w-full ">
            <FormControl className="">
              <Button
                onClick={() => {
                  if (checked && clearable) {
                    field.onChange(defaultValue);
                  } else {
                    field.onChange(value);
                  }
                }}
                className={cn(
                  "bg-transparent h-12 border-2 border-border text-popover-foreground w-full flex flex-row items-center justify-start px-2",
                  checked && "border-emerald-600"
                )}
              >
                {placeholder}
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring" }}
                      className=" ml-auto rtl:ml-0 rtl:mr-auto"
                    >
                      <Icon
                        icon="lets-icons:check-fill"
                        className=" text-emerald-600 transition-all duration-300 w-6! h-6!"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </FormControl>
          </div>

          <div className="min-h-4">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
