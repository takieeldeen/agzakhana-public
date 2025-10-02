"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Link href="/">
      {isDark && (
        <Image
          src={
            "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(2).png"
          }
          height={140}
          width={280}
          alt="Agzakhana"
          priority
        />
      )}
      {!isDark && (
        <Image
          src={
            "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/New%20Project%20(1).png"
          }
          height={140}
          width={280}
          alt="Agzakhana"
          priority
        />
      )}
    </Link>
  );
}
