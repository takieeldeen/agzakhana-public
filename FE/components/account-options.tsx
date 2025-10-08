"use client";
import { CartPopover } from "./cart-popover";
import { ModeToggle } from "./theme-toggle";
// import { WhishlistPopover } from "./whishlist-popover";
import UserOptions from "./user-options";

export default function AccountOptions() {
  return (
    <>
      <li className="hidden md:flex flex-row gap-3 items-end">
        <CartPopover />
      </li>
      <li className="hidden md:flex flex-row gap-1 items-end">
        <UserOptions />
      </li>
    </>
  );
}
