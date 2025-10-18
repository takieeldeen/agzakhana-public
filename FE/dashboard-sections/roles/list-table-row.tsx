"use client";
import EllipsisTypography from "@/components/ellipsis-typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function ListTableRow({ role }: { role: any }) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <li
      key={role?.id}
      className="bg-card w-full h-24 rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 "
    >
      <Icon
        icon="qlementine-icons:user-16"
        className="h-[4.5rem] w-[4.5rem] text-border"
      />
      <div className="flex flex-col gap-1 w-3/6">
        <p className="font-semibold text-black">
          {role?.[isRtl ? "nameAr" : "nameEn"]}
        </p>
        <div className="flex flex-row gap-3">
          <Badge
            className={cn(
              "bg-emerald-600 capitalize",
              role?.status === "INACTIVE" && "bg-rose-800"
            )}
          >
            {role?.status?.toLowerCase()}
          </Badge>
          <EllipsisTypography className="text-muted-foreground">
            {role?.[isRtl ? "descriptionAr" : "descriptionEn"]}
          </EllipsisTypography>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-row gap-8 ">
        <div>
          <p className="font-semibold text-black">Users With this role</p>
          <p className="text-muted-foreground">{role?.usersCount}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Number of Permissions</p>
          <p className="text-muted-foreground">{role?.permissionsCount}</p>
        </div>
      </div>
      <Button
        onClick={() => setShowOptions((prev) => !prev)}
        className={cn(
          "h-12 w-12  ml-auto bg-transparent rounded-xl border-2",
          showOptions &&
            "rotate-90 bg-emerald-600 text-white border-transparent "
        )}
      >
        <Icon
          icon="ri:more-fill"
          className={cn(
            "text-gray-500 h-6! w-6!",
            showOptions && " text-white"
          )}
        />
      </Button>
    </li>
  );
}
