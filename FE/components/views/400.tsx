"use client";
import imageLight from "@/assets/images/400-light.svg";
import imageDark from "@/assets/images/400-dark.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
export default function View400() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const theme = useTheme();
  //   const isDark = theme.resolvedTheme === "dark";
  const t = useTranslations();
  const router = useRouter();
  useEffect(() => {
    if (theme.resolvedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme.resolvedTheme]);
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-2">
      {isDark && (
        <Image
          src={imageDark}
          alt="not found error"
          className="h-128 fill-emerald-600"
          priority
        />
      )}
      {!isDark && (
        <Image
          src={imageLight}
          alt="not found error"
          className="h-128 fill-emerald-600"
          priority
        />
      )}
      <p className="text-primary dark:text-white text-3xl font-bold mb-4">
        {t("COMMON.ERROR")}
      </p>
      <Button
        onClick={() => router.refresh()}
        className="bg-emerald-600 py-6 font-semibold px-4 rounded-md cursor-pointer text-white transition-all duration-300"
      >
        <Icon icon="lucide:refresh-cw" />
        {t("COMMON.REFRESH")}
      </Button>
    </div>
  );
}
