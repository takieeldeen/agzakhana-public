import { cn } from "@/lib/utils";
import { Tags } from "@/types/medcines";
import { getTranslations } from "next-intl/server";
import { ComponentProps } from "react";

type Props = { tag: Tags | null } & ComponentProps<"span">;
export default async function ProductTag({ tag, className, ...other }: Props) {
  type SpanClassName = React.HTMLAttributes<HTMLSpanElement>["className"];

  const tagStyles: Record<string, SpanClassName> = {
    HOT: "bg-[#F74B81] dark:brightness-95 text-white px-2 py-1 ",
    SALE: "bg-[#67BCEE] text-white px-2 py-1 ",
    NEW: "bg-[#3BB77E] text-white px-2 py-1 ",
  };
  const t = await getTranslations();
  if (!tag) return null;
  return (
    <span
      {...other}
      className={cn(
        tagStyles?.[tag],
        "w-fit rounded-br-xl rounded-tl-xl text-xs min-w-16 flex items-center justify-center font-semibold absolute h-8 rtl:left-0",
        className
      )}
    >
      {t(`HOME_PAGE.${tag}`)}
    </span>
  );
}
