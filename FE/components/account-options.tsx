"use client";
import { getTranslations } from "next-intl/server";
import { CartPopover } from "./cart-popover";
import { WhishlistPopover } from "./whishlist-popover";
import UserOptions from "./user-options";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "use-intl";

export default function AccountOptions() {
  const t = useTranslations("");
  const { user, isAuthenticated } = useAuth();
  console.log(user, isAuthenticated);
  return (
    <ul className="flex flex-row gap-6 ">
      <li className="flex flex-row gap-3 items-end">
        <WhishlistPopover />
      </li>

      <li className="flex flex-row gap-3 items-end">
        <CartPopover />
      </li>
      <li className="flex flex-row gap-1 items-end">
        <UserOptions user={user} />
      </li>
    </ul>
  );
}
