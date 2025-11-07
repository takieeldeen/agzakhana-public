"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function View403() {
  const t = useTranslations();
  const router = useRouter();
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-2 relative">
      <div className="flex flex-row rtl:flex-row-reverse text-9xl font-bold gap-3 items-center">
        <p className="" style={{ fontSize: "16rem" }}>
          4
        </p>
        <Icon
          icon="streamline-plump:block-1-solid"
          className="text-emerald-600"
          style={{ fontSize: "14rem" }}
        />
        <p className="" style={{ fontSize: "16rem" }}>
          3
        </p>
      </div>
      <p className="text-primary dark:text-white text-3xl font-bold mb-4">
        {t("COMMON.UNAUTHORIZED")}
      </p>
      <Button
        onClick={() => router.refresh()}
        className="bg-emerald-600 py-6 font-semibold px-4 rounded-md cursor-pointer text-white transition-all duration-300"
      >
        {t("COMMON.BACK_TO_HOME")}
      </Button>
    </div>
  );
}
