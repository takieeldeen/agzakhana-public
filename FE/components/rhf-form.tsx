"use client";
import { ComponentProps, ReactNode } from "react";
import { Form } from "./ui/form";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues = FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
} & ComponentProps<"form">;

export default function RHFForm<T extends FieldValues>({
  methods,
  onSubmit,
  children,
  className,
  ...others
}: Props<T>) {
  return (
    <Form {...methods}>
      <form
        {...others}
        className={cn("flex flex-col gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </Form>
  );
}
