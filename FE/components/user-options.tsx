"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCallback } from "react";
import { logout } from "@/client-api/auth";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "./ui/skeleton";

export default function UserOptions() {
  const { user, userLoading } = useAuth();
  const t = useTranslations();
  const { logout: logoutLocally } = useAuth();
  const handleLogout = useCallback(async () => {
    await logout();
    logoutLocally();
    window.location.href = "/";
  }, [logoutLocally]);
  if (userLoading)
    return (
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full aspect-square" />
        <div className="flex flex-col items-start justify-start gap-2">
          <Skeleton className="h-3 w-32 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
      </div>
    );
  if (!!user)
    return (
      <div className="flex flex-row items-center gap-2">
        <Link href="/profile">
          <Avatar className="h-11 w-11">
            <AvatarImage
              key={user?.imageUrl} // 🔑 ensures reload when URL changes
              src={user?.imageUrl}
              alt="@shadcn"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-gray-300 font-semibold text-xl ">
              {user?.name
                ?.split(" ")
                ?.slice(0, 2)
                ?.map((el) => el[0])
                ?.join(" ")}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col items-start justify-start ">
          <span className="font-bold dark:text-gray-100">{user?.name}</span>
          <Button
            className="font-bold bg-transparent shadow-none text-gray-500 dark:text-gray-400 px-0! py-0!  h-fit gap-2 "
            onClick={handleLogout}
          >
            {t("HEADER.SIGN_OUT")}
          </Button>
        </div>
      </div>
    );
  return (
    <Link href="/login" className="flex flex-row items-end gap-2">
      <div className="relative">
        <Icon
          icon="stash:signin-light"
          width={30}
          height={30}
          className="text-text-primary dark:text-white"
        />
      </div>
      <span className="font-semibold dark:text-white">
        {" "}
        {t("HEADER.SIGN_IN")}
      </span>
    </Link>
  );
}
