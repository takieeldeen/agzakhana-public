"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  progressProps,
  className,
  value,
  ...props
}: { progressProps?: React.ComponentProps<"div"> } & React.ComponentProps<
  typeof ProgressPrimitive.Root
>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full dark:bg-card-background-dark",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        {...progressProps}
        data-slot="progress-indicator"
        className={cn(
          "bg-primary h-full w-full flex-1 transition-all",
          progressProps?.className
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
