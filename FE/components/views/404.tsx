import imageLight from "@/assets/images/404-light.svg";
import imageDark from "@/assets/images/404-dark.svg";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
export default function View404() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const theme = useTheme();
  const t = useTranslations();
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
        {t("COMMON.NOT_FOUND", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
        })}
      </p>
      <Link
        href="/dashboard"
        className="bg-emerald-600 py-3 font-semibold px-4 rounded-md cursor-pointer text-white hover:!bg-rose-900 transition-all duration-300"
      >
        {t("COMMON.BACK_TO_HOME")}
      </Link>
    </div>
  );
}
