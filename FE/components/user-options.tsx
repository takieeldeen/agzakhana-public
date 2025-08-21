"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UserOptions() {
  const t = useTranslations();
  // const currentUser = {
  //   imageUrl:
  //     "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/ahmed_yasser",
  //   name: "أحمد ياسر عبدالحميد",
  // };
  const currentUser = null;
  if (!!currentUser)
    return (
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-11 w-11">
          <AvatarImage src={currentUser?.imageUrl} alt="@shadcn" />
          <AvatarFallback className="bg-gray-300 font-semibold text-xl">
            {currentUser?.name
              ?.split(" ")
              ?.slice(0, 2)
              ?.map((el) => el[0])
              ?.join(" ")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-start ">
          <span className="font-bold">تقي الدين أحمد علي</span>
          <Button className="font-bold bg-transparent shadow-none text-gray-500 px-0! py-0!  h-fit gap-2 hover:gap-3">
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
