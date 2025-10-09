import * as React from "react";

import { cn } from "@/lib/utils";
export type InputProps = React.ComponentProps<"input"> & {
  startAdornment?: React.ReactElement<any>;
  endAdornment?: React.ReactElement<any>;
};
function Input({
  className,
  type,
  endAdornment,
  startAdornment,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {startAdornment &&
        React.cloneElement(startAdornment, {
          className: cn(
            "absolute left-0 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-0",
            startAdornment?.props.className
          ),
        })}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] disabled:bg-gray-300 disabled:dark:bg-gray-600",
          // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "hover:border-agzakhana-primary transition-all duration-300",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {endAdornment &&
        React.cloneElement(endAdornment, {
          className: cn(
            "absolute right-0 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-0",
            endAdornment?.props.className
          ),
        })}
    </div>
  );
}

export { Input };
