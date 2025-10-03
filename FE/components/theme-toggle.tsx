"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);
  const t = useTranslations();
  const handleChangeTheme = React.useCallback(() => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [resolvedTheme, setTheme]);
  const isDark = resolvedTheme === "dark";
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex flex-row items-center gap-2">
      <Icon icon="circum:dark" className="dark:text-white h-6 w-6" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Switch
            onClick={handleChangeTheme}
            checked={isDark}
            id="airplane-mode"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isDark
              ? t("HEADER.SWITCH_TO_LIGHT_MODE")
              : t("HEADER.SWITCH_TO_DARK_MODE")}
          </p>
        </TooltipContent>
      </Tooltip>
      <Icon icon="circum:light" className="dark:text-white h-6 w-6" />
    </div>
    // <div className="flex items-center -space-x-2">

    // <Label htmlFor="airplane-mode">Airplane Mode</Label>
    // </div>
  );
}
