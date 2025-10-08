"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { ComponentProps, useEffect, useState } from "react";

type Props = {
  imageProps?: ImageProps;
} & ComponentProps<"div">;

export default function Logo({ imageProps, ...other }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoids hydration mismatch
  return (
    <Link href="/">
      {isDark ? (
        <div
          {...other}
          className={cn(
            "relative h-[38.5px] md:h-[110px] w-[98px] md:w-[280px]",
            other?.className
          )}
        >
          <Image
            src={
              "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(2).png"
            }
            alt="Agzakhana"
            className="object-fill"
            fill
            priority
            {...imageProps}
          />
        </div>
      ) : (
        <div
          {...other}
          className={cn(
            "relative h-[38.5px] md:h-[110px] w-[98px] md:w-[280px]",
            other?.className
          )}
        >
          <Image
            src={
              "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(1).png"
            }
            alt="Agzakhana"
            className="object-fill"
            fill
            priority
            {...imageProps}
          />
        </div>
      )}
    </Link>
  );
}
