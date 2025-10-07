"use client";
import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  imageProps?: ImageProps;
};

export default function Logo({ imageProps }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoids hydration mismatch
  return (
    <Link href="/">
      {isDark ? (
        <Image
          src={
            "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(2).png"
          }
          height={140}
          width={280}
          alt="Agzakhana"
          priority
          {...imageProps}
        />
      ) : (
        <Image
          src={
            "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(1).png"
          }
          height={140}
          width={280}
          alt="Agzakhana"
          priority
          {...imageProps}
        />
      )}
    </Link>
  );
}
