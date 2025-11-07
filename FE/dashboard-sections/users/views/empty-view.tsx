import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ComponentProps } from "react";

type EmptyViewProps = {
  title?: string;
  subtitle?: string;
  actionTitle?: string;
  actionProps?: ComponentProps<"button">;
  icon?: string;
  action?: VoidFunction;
};

export default function EmptyView({
  title,
  subtitle,
  actionTitle,
  actionProps,
  icon,
  action,
}: EmptyViewProps) {
  return (
    <Empty className="h-full w-full">
      <EmptyHeader>
        {icon && (
          <EmptyMedia variant="icon" className="h-24 w-24 dark:bg-dark-card">
            <Icon icon={icon} className="h-16! w-16!" />
          </EmptyMedia>
        )}
        {title && (
          <EmptyTitle className="dark:text-gray-200">{title}</EmptyTitle>
        )}
        {subtitle && <EmptyDescription>{subtitle}</EmptyDescription>}
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          {action && (
            <Button
              onClick={action}
              {...actionProps}
              className={cn(
                "dark:bg-emerald-600 text-white h-12",
                actionProps?.className
              )}
            >
              {actionTitle}
            </Button>
          )}
        </div>
      </EmptyContent>
    </Empty>
  );
}
