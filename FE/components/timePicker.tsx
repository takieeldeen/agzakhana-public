import { Clock8Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type TimePickerProps = ComponentProps<"input">;
const TimePicker = (props: TimePickerProps) => {
  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center justify-center pl-3 rtl:pl-0 rtl:pr-3 peer-disabled:opacity-50">
          <Clock8Icon className="size-4" />
          <span className="sr-only">User</span>
        </div>
        <Input
          defaultValue="08:30:00"
          {...props}
          type="time"
          id="time-picker"
          step="1"
          dir="rtl"
          className={cn(
            "peer h-12 w-full text-right! appearance-none pl-9 rtl:pl-2 rtl:pr-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none font-semibold",
            props?.className
          )}
        />
      </div>
    </div>
  );
};

export default TimePicker;
