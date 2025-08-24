"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserType } from "@/types/users";
import { useCallback } from "react";
import { logout } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function UserOptions({ user }: { user: UserType | undefined }) {
  const t = useTranslations();
  const router = useRouter();
  const { logout: logoutLocally } = useAuth();
  const handleLogout = useCallback(async () => {
    await logout();
    logoutLocally();
    router.refresh();
  }, []);
  if (!!user)
    return (
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-11 w-11">
          <AvatarImage src={user?.imageUrl} alt="@shadcn" />
          <AvatarFallback className="bg-gray-300 font-semibold text-xl ">
            {user?.name
              ?.split(" ")
              ?.slice(0, 2)
              ?.map((el) => el[0])
              ?.join(" ")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-start ">
          <span className="font-bold">{user?.name}</span>
          <Button
            className="font-bold bg-transparent shadow-none text-gray-500 px-0! py-0!  h-fit gap-2 hover:gap-3"
            onClick={handleLogout}
          >
            {t("HEADER.SIGN_OUT")}
            <Icon icon="stash:signout" className="w-6! h-6!" />
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
          className="text-text-primary"
        />
      </div>
      <span className="font-semibold"> {t("HEADER.SIGN_IN")}</span>
    </Link>
  );
}
