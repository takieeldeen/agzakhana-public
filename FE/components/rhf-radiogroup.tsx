"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type RadioGroupType = {
  name: string;
  options: {
    label: string;
    value: string | number | boolean;
  }[];
  label?: string;
};
export default function RHFRadioGroup({
  name,
  label,
  options,
}: RadioGroupType) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row items-center"
            >
              {options?.map((option) => (
                <FormItem
                  key={`${option?.value}`}
                  className={cn(
                    "flex items-center gap-3 w-full border-2 h-12 rounded-md px-2 hover:border-gray-300 transition-all cursor-pointer",
                    field.value === option.value &&
                      "border-agzakhana-primary text-agzakhana-primary border-2"
                  )}
                >
                  <FormControl>
                    <RadioGroupItem value={option?.value as any} />
                  </FormControl>
                  <FormLabel className="font-semibold cursor-pointer">
                    {option?.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <div className="min-h-4">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
