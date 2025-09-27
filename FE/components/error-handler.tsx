import { ReactNode } from "react";
import SERVER_DOWN_ILLUSTRATION from "@/public/server-down.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ErrorHandler({
  error,
  children,
}: {
  error: any;
  children: ReactNode;
}) {
  const t = useTranslations();
  if (!!error)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="h-96 w-96 flex flex-row items-center relative">
          <Image
            src={SERVER_DOWN_ILLUSTRATION}
            alt="Server Went down"
            className="object-contain"
            fill
          />
        </div>
        <h3 className="text-3xl">{t("COMMON.GENERIC_ERROR")}</h3>
        <Link
          href="/"
          className="bg-agzakhana-primary min-w-48 px-4 h-12 rounded-md flex items-center justify-center text-white text-base transition-all duration-300 hover:brightness-75"
        >
          {t("COMMON.BACK_TO_HOME")}
        </Link>
      </div>
    );
  return children;
}
