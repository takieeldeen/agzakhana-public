"use client";
import { CartPopover } from "./cart-popover";
// import { WhishlistPopover } from "./whishlist-popover";
import UserOptions from "./user-options";
import { useAuth } from "@/hooks/useAuth";

export default function AccountOptions() {
  const { user } = useAuth();
  return (
    <ul className="flex flex-row gap-6 ">
      {/* <li className="flex flex-row gap-3 items-end">
        <WhishlistPopover />
      </li> */}

      <li className="flex flex-row gap-3 items-end">
        <CartPopover />
      </li>
      <li className="flex flex-row gap-1 items-end">
        <UserOptions user={user} />
      </li>
    </ul>
  );
}
